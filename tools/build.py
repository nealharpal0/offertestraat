"""Bouwt de offertestraat van src/ naar _site/.

- zet style.css en app.js terug in index.html (één zelfstandig bestand, zoals het origineel)
- maakt de lettertypen uit tools/fonts.json en zet ze als woff2 in index.html
- maakt de PNG-iconen uit icons/favicon.svg
- kopieert manifest, service worker en fontlicentie

Gebruik:  pip install fonttools brotli cairosvg   en dan   python tools/build.py
"""
import base64
import io
import json
import shutil
import urllib.parse
import urllib.request
from pathlib import Path

import cairosvg
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = ROOT / "_site"
CACHE = ROOT / ".fontcache"
ICONS = {
    "icon-192.png": 192,
    "icon-512.png": 512,
    "icon-maskable-512.png": 512,
    "apple-touch-icon.png": 180,
}


def parse_unicodes(spec):
    result = []
    for part in spec.split(","):
        a, _, b = part.partition("-")
        result.extend(range(int(a, 16), int(b or a, 16) + 1))
    return result


def source_font(commit, path):
    local = CACHE / commit / path
    if not local.exists():
        local.parent.mkdir(parents=True, exist_ok=True)
        url = f"https://raw.githubusercontent.com/google/fonts/{commit}/{urllib.parse.quote(path)}"
        with urllib.request.urlopen(url) as r:
            local.write_bytes(r.read())
    return local


def build_font(commit, spec):
    font = TTFont(source_font(commit, spec["source"]))
    if "fvar" in font:
        font = instancer.instantiateVariableFont(font, spec["axes"])
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    opts.flavor = "woff2"
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=parse_unicodes(spec["unicodes"]))
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    return "data:font/woff2;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "icons").mkdir(parents=True)

    html = (SRC / "index.html").read_text(encoding="utf-8")
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js = (SRC / "app.js").read_text(encoding="utf-8")
    assert html.count("\n/*@CSS*/\n") == 1 and html.count("\n/*@JS*/\n") == 1
    html = html.replace("\n/*@CSS*/\n", css).replace("\n/*@JS*/\n", js)

    cfg = json.loads((ROOT / "tools" / "fonts.json").read_text(encoding="utf-8"))
    for spec in cfg["fonts"]:
        assert html.count(spec["placeholder"]) == 1, spec["placeholder"]
        html = html.replace(spec["placeholder"], build_font(cfg["google_fonts_commit"], spec))
        print("lettertype:", spec["family"], spec["weight"])
    assert "__FONT_" not in html
    (OUT / "index.html").write_text(html, encoding="utf-8")

    # De PNG-iconen worden gemaakt uit favicon.svg.
    svg = SRC / "icons" / "favicon.svg"
    shutil.copy(svg, OUT / "icons" / "favicon.svg")
    for name, size in ICONS.items():
        cairosvg.svg2png(url=str(svg), write_to=str(OUT / "icons" / name), output_width=size, output_height=size)

    for name in ("manifest.webmanifest", "sw.js", "LICENSE-fonts.txt"):
        shutil.copy(SRC / name, OUT / name)
    print("klaar:", sorted(str(p.relative_to(OUT)) for p in OUT.rglob("*") if p.is_file()))


if __name__ == "__main__":
    main()
