
(function () {
'use strict';
/* =========================================================================
   De offertestraat — animatie-engine
   Namen en voorbeeldgegevens kun je hieronder (CFG) aanpassen.
   ========================================================================= */
const CFG = {
  bedrijf: 'Kemeling',
  controleur: 'Richard',
  klant: { naam: 'Mark Jansen', aanhef: 'meneer Jansen', bedrijf: 'Kwekerij Jansen', plaats: 'Honselersdijk' },
  dossier: '#0142',
  versie: 'concept 1',
  datum: '21-09-2026'
};

/* ---------- icons (eigen, lijnstijl) ---------- */
const ICON_PATHS = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.8 6.8 12 12.6l8.2-5.8"/>',
  read: '<path d="M4 5.5h10M4 9.5h7M4 13.5h5"/><circle cx="15" cy="14.5" r="4.2"/><path d="m18.1 17.6 2.9 2.9"/>',
  fill: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="m8.6 11.3 2 2 3.8-3.8"/><path d="M9 17h3.2M14.6 15.6v3M13.1 17.1h3"/>',
  voice: '<path d="M4 5h16v11h-9.5L6 20v-4H4z"/><path d="M8 9h8M8 12.3h5"/>',
  send: '<path d="M21 3 10.2 13.8"/><path d="M21 3 14.4 21l-4.2-7.2L3 9.6z"/>',
  sheet: '<rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M3.5 9h17M3.5 14.5h17M9.5 4v16"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20.2c.9-3.7 3.7-5.7 7.2-5.7s6.3 2 7.2 5.7"/>',
  kas: '<path d="M3 20.5v-9l3-3.2 3 3.2 3-3.2 3 3.2 3-3.2 3 3.2v9z"/><path d="M6 8.3v12.2M12 8.3v12.2M18 8.3v12.2M3 15.5h18"/>',
  doc: '<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14 3v5h5"/><path d="M9 12.5h7M9 16h5"/>',
  folder: '<path d="M3 7.2A2.2 2.2 0 0 1 5.2 5H9l2.2 2.3h7.6A2.2 2.2 0 0 1 21 9.5v8.3a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.8z"/>',
  tag: '<path d="M4 4h10.5L20 9.5V20H4z"/><circle cx="8.2" cy="8.2" r="1.3"/><path d="M8 13h8M8 16.5h5.5"/>',
  plug: '<path d="M9 3v5M15 3v5"/><path d="M6.5 8h11v3.2a5.5 5.5 0 0 1-11 0z"/><path d="M12 16.7V21"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  check: '<path d="m5 12.5 4.3 4.3L19 7.2"/>',
  cross: '<path d="M7 7l10 10M17 7 7 17"/>',
  alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/>',
  checkc: '<circle cx="12" cy="12" r="8.5"/><path d="m8 12.3 2.8 2.8L16.2 9.6"/>',
  arrow: '<path d="M4 12h15M14 7l5 5-5 5"/>',
  arrowd: '<path d="M12 4v15M7 14l5 5 5-5"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M7.5 5h3.2v14H7.5zM13.3 5h3.2v14h-3.2z" fill="currentColor" stroke="none"/>',
  prev: '<path d="M15 5 8 12l7 7"/>',
  next: '<path d="m9 5 7 7-7 7"/>',
  list: '<path d="M8.5 6.5h11.5M8.5 12h11.5M8.5 17.5h11.5"/><circle cx="4.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="17.5" r="1.1" fill="currentColor" stroke="none"/>',
  auto: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7"/><path d="M20 4v4.7h-4.7"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.3"/><path d="M4 20v-4.7h4.7"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"/><path d="M4.5 4.5V9H9"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  install: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5"/><path d="M5 15.5V20h14v-4.5"/>',
  diagram: '<rect x="3.5" y="3.5" width="7" height="5" rx="1"/><rect x="13.5" y="15.5" width="7" height="5" rx="1"/><rect x="3.5" y="15.5" width="7" height="5" rx="1"/><path d="M7 8.5v7M10.5 18h3"/>',
  pen: '<path d="M4 20l4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16z"/><path d="M14.5 6.5l3 3"/>'
};
function icon(name, cls) {
  return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[name] + '</svg>';
}

/* ---------- het team ---------- */
const AGENTS = {
  klant:   { icon: 'kas',    name: 'Klant', kind: 'klant', role: CFG.klant.bedrijf },
  a1:      { icon: 'read',   name: 'Lees-agent', no: 1, role: 'leest de mails' },
  a2:      { icon: 'fill',   name: 'Aanvul-agent', no: 2, role: 'vult informatie aan' },
  a3:      { icon: 'voice',  name: 'Tone-of-voice-agent', short: 'Tone of voice', no: 3, role: 'schrijft in onze stijl' },
  a4:      { icon: 'send',   name: 'Verzend-agent', no: 4, role: 'verstuurt de mails' },
  a5:      { icon: 'sheet',  name: 'Excel-agent', no: 5, role: 'vult de calculatie in' },
  richard: { icon: 'person', name: CFG.controleur, kind: 'human', role: 'controleert en vult aan' }
};
function tile(key, extra) {
  const a = AGENTS[key];
  const kind = a.kind === 'human' ? ' tile--human' : a.kind === 'klant' ? ' tile--klant' : '';
  return '<div class="tile' + kind + (extra ? ' ' + extra : '') + '" data-k="' + key + '">' + icon(a.icon) + (a.no ? '<span class="no">' + a.no + '</span>' : '') + '</div>';
}

/* ---------- helpers ---------- */
const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const EASE = {
  lin: t => t,
  out: t => 1 - Math.pow(1 - t, 3),
  io: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
};
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function pill(state, text) {
  const ic = state === 'busy' ? '<span class="dot"></span>' : state === 'done' ? icon('check') : state === 'miss' ? icon('alert') : '';
  return '<span class="pill' + (state ? ' ' + state : '') + '">' + ic + '<span>' + text + '</span></span>';
}
function setPill(p, state, text) {
  if (!p) return;
  const n = el(pill(state, text));
  p.className = n.className;
  p.innerHTML = n.innerHTML;
}

/* ---------- dossier ---------- */
const ROWS = [
  ['klant', 'Klant'], ['product', 'Product'], ['maten', 'Afmetingen'],
  ['adres', 'Afleveradres'], ['toepassing', 'Toepassing'], ['aantal', 'Aantal']
];
const VAL = {
  klant: CFG.klant.bedrijf,
  product: 'Rechthoekige bak',
  maten: '2000 × 1000 × 800 mm',
  adres: CFG.klant.plaats,
  toepassing: 'Voedingswater',
  aantal: '3 stuks'
};
function rowInner(s, v) {
  if (s === 'ok') return ['<span>' + v + '</span>', icon('check')];
  if (s === 'added') return ['<span>' + v + '</span><span class="chip-add">aangevuld</span>', icon('check')];
  if (s === 'miss') return ['<span>ontbreekt</span>', icon('alert')];
  return ['<span>—</span>', ''];
}
function dossierHTML(state, only) {
  state = state || {};
  const rows = ROWS.filter(r => !only || only.includes(r[0])).map(([k, label]) => {
    const st = state[k] || 'empty';
    const [v, s] = rowInner(st, VAL[k]);
    return '<div class="dos-r is-' + (st === 'added' ? 'ok' : st) + '" data-k="' + k + '"><span class="k">' + label + '</span><span class="v">' + v + '</span><span class="s">' + s + '</span></div>';
  }).join('');
  return '<div class="dos"><div class="dos-h">' + icon('tag') + '<span>Dossier</span><span class="id">' + CFG.dossier + '</span></div>' + rows + '</div>';
}
function setRow(root, k, st) {
  const r = root.querySelector('.dos-r[data-k="' + k + '"]');
  if (!r) return;
  const [v, s] = rowInner(st, VAL[k]);
  r.className = 'dos-r is-' + (st === 'added' ? 'ok' : st);
  r.querySelector('.v').innerHTML = v;
  r.querySelector('.s').innerHTML = s;
  r.classList.add('flash');
  setTimeout(() => r.classList.remove('flash'), 650);
}

/* =========================================================================
   Engine: een eigen klok, zodat pauzeren alles stil zet
   ========================================================================= */
const SCENES = [];
const E = {
  i: 0, t: 0, playing: false, auto: true, atEnd: false,
  events: [], tweens: [], loops: [],
  layer: null, scale: 1, raf: 0, last: 0, paused: [], override: false
};

function makeTL(layer) {
  const tl = {
    layer,
    at(ms, fn) { E.events.push({ at: ms, fn, done: false }); return ms; },
    tween(ms, dur, fn, ez) { E.tweens.push({ at: ms, dur: Math.max(1, dur), fn, ez: ez || EASE.io, done: false }); return ms + dur; },
    loop(fn) { E.loops.push(fn); },
    add(ms, node, cls) { return tl.at(ms, () => { if (node) node.classList.add(cls || 'in'); }); },
    rem(ms, node, cls) { return tl.at(ms, () => { if (node) node.classList.remove(cls); }); },
    type(ms, node, text, cps) {
      const dur = RM.matches ? 1 : (text.length / (cps || 55)) * 1000;
      tl.tween(ms, dur, (p, raw) => { node.textContent = text.slice(0, Math.round(text.length * raw)); }, EASE.lin);
      return ms + dur;
    },
    fly(ms, from, to, text, onArrive, opts) {
      opts = opts || {};
      const dur = RM.matches ? 0 : (opts.dur || 760);
      tl.at(ms, () => { if (dur) flyToken(layer, from, to, text, dur, opts); });
      tl.at(ms + dur * .88, () => { if (onArrive) onArrive(); });
      return ms + dur;
    },
    pill(ms, p, state, text) { return tl.at(ms, () => setPill(p, state, text)); },
    mini(ms, active) { return tl.at(ms, () => setMini(active)); }
  };
  return tl;
}

function rel(node) {
  const c = canvas.getBoundingClientRect();
  const r = node.getBoundingClientRect();
  const s = E.scale || 1;
  return { x: (r.left - c.left) / s, y: (r.top - c.top) / s, w: r.width / s, h: r.height / s };
}
function flyToken(layer, from, to, text, dur, opts) {
  const a = rel(from), b = rel(to);
  const tok = document.createElement('div');
  tok.className = opts.cls || 'fly';
  if (opts.html) tok.innerHTML = opts.html; else tok.textContent = text;
  layer.appendChild(tok);
  const w = tok.offsetWidth, hh = tok.offsetHeight;
  const x0 = a.x + a.w / 2 - w / 2, y0 = a.y + a.h / 2 - hh / 2;
  const x1 = opts.center ? b.x + b.w / 2 - w / 2 : b.x, y1 = b.y + b.h / 2 - hh / 2;
  const xm = (x0 + x1) / 2 + (opts.bend || 0), ym = Math.min(y0, y1) + (opts.arc == null ? -34 : opts.arc);
  const anim = tok.animate([
    { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(.85)', opacity: 0 },
    { transform: 'translate(' + x0 + 'px,' + (y0 - 5) + 'px) scale(1)', opacity: 1, offset: .12 },
    { transform: 'translate(' + xm + 'px,' + ym + 'px) scale(1.05)', opacity: 1, offset: .52 },
    { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(1)', opacity: 1, offset: .9 },
    { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.95)', opacity: 0 }
  ], { duration: dur, easing: 'cubic-bezier(.45,.05,.3,1)', fill: 'forwards' });
  anim.onfinish = () => tok.remove();
}

function tick(ts) {
  E.raf = requestAnimationFrame(tick);
  const dt = E.last ? Math.min(ts - E.last, 80) : 16;
  E.last = ts;
  if (!E.playing) return;
  E.t += dt * (E.rate || 1);
  run();
  progress();
  const sc = SCENES[E.i];
  if (!E.atEnd && E.t >= sc.duration) { E.atEnd = true; sceneEnded(); }
}
function run() {
  const due = E.events.filter(ev => !ev.done && ev.at <= E.t).sort((a, b) => a.at - b.at);
  for (const ev of due) { ev.done = true; try { ev.fn(); } catch (err) { console.error(err); } }
  for (const tw of E.tweens) {
    if (tw.done || tw.at > E.t) continue;
    const raw = clamp((E.t - tw.at) / tw.dur, 0, 1);
    try { tw.fn(tw.ez(raw), raw); } catch (err) { console.error(err); }
    if (raw >= 1) tw.done = true;
  }
  for (const fn of E.loops) { try { fn(E.t); } catch (err) { console.error(err); } }
}
function sceneEnded() {
  const last = E.i === SCENES.length - 1;
  const sc = SCENES[E.i];
  if (!sc.hold && E.auto && !last) { go(E.i + 1); return; }
  bNext.classList.toggle('nudge', !last);
}

function go(i, opts) {
  opts = opts || {};
  i = clamp(i, 0, SCENES.length - 1);
  canvas.dataset.dir = i >= E.i ? '1' : '-1';
  E.i = i; E.t = 0; E.atEnd = false; E.override = false;
  E.events = []; E.tweens = []; E.loops = [];
  E.paused.forEach(a => { try { a.play(); } catch (err) { /* */ } });
  E.paused = [];
  bNext.classList.remove('nudge');
  const old = E.layer;
  if (old) { old.classList.add('leaving'); setTimeout(() => old.remove(), 420); }
  const layer = document.createElement('div');
  layer.className = 'layer entering';
  canvas.appendChild(layer);
  E.layer = layer;
  const sc = SCENES[i];
  setMini(sc.station === undefined ? null : sc.station);
  sc.build(layer, makeTL(layer));
  void layer.offsetWidth;
  layer.classList.remove('entering');
  caption(sc);
  progress(true);
  markSheet();
  run();
  if (opts.play === false) pause(); else play();
}

function play() {
  if (E.override) { E.override = false; caption(SCENES[E.i]); $$('.node.sel', canvas).forEach(n => n.classList.remove('sel')); }
  E.paused.forEach(a => { try { a.play(); } catch (err) { /* */ } });
  E.paused = [];
  E.playing = true;
  if (!E.raf) { E.last = 0; E.raf = requestAnimationFrame(tick); }
  playBtn();
  wake(true);
}
function pause() {
  E.playing = false;
  if (E.raf) { cancelAnimationFrame(E.raf); E.raf = 0; }
  E.paused = document.getAnimations ? document.getAnimations().filter(a => a.playState === 'running') : [];
  E.paused.forEach(a => a.pause());
  playBtn();
  wake(false);
}
function toggle() {
  if (E.playing) { pause(); return; }
  if (E.atEnd && E.i === SCENES.length - 1) { go(0); return; }
  play();
}

/* ---------- UI refs ---------- */
const app = $('#app');
const stage = $('#stage');
const cwrap = $('#cwrap');
const canvas = $('#canvas');
const mini = $('#mini');
const dim = $('#dim');
const dimFill = $('#dimFill');
const dimLabel = $('#dimLabel');
const tb = $('#tb');
const tbNo = $('#tbNo');
const tbEyebrow = $('#tbEyebrow');
const tbTitle = $('#tbTitle');
const tbText = $('#tbText');
const bPrev = $('#bPrev');
const bPlay = $('#bPlay');
const bNext = $('#bNext');
const bList = $('#bList');
const bAuto = $('#bAuto');
const sheet = $('#sheet');

function playBtn() {
  bPlay.innerHTML = icon(E.playing ? 'pause' : 'play');
  bPlay.setAttribute('aria-label', E.playing ? 'Pauzeren' : 'Afspelen');
}

/* ---------- mini map (de straat bovenin) ---------- */
const MINI = ['klant', 'a1', 'a2', 'a3', 'a4', 'a5', 'richard'];
function buildMini() {
  mini.innerHTML = MINI.map(k => {
    const a = AGENTS[k];
    const kind = a.kind === 'human' ? ' st--human' : a.kind === 'klant' ? ' st--klant' : '';
    return '<div class="st' + kind + '" data-k="' + k + '">' + icon(a.icon) + (a.no ? '<span class="no">' + a.no + '</span>' : '') + '</div>';
  }).join('');
}
function setMini(active) {
  $$('.st', mini).forEach(n => {
    const k = n.dataset.k;
    n.classList.toggle('on', Array.isArray(active) ? active.includes(k) : active === k);
    n.classList.toggle('lit', active === 'all');
  });
}

/* ---------- maatlijn (voortgang) ---------- */
let TOTAL = 0, STARTS = [];
function buildDim() {
  TOTAL = 0; STARTS = [];
  SCENES.forEach(s => { STARTS.push(TOTAL); TOTAL += s.duration; });
  dim.querySelectorAll('.dim-tick').forEach(n => n.remove());
  STARTS.slice(1).forEach(st => {
    const tk = document.createElement('span');
    tk.className = 'dim-tick';
    tk.style.left = (st / TOTAL * 100) + '%';
    dim.appendChild(tk);
  });
}
const fmt = ms => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
let lastLabel = '';
function progress() {
  const sc = SCENES[E.i];
  const done = STARTS[E.i] + Math.min(E.t, sc.duration);
  dimFill.style.width = (done / TOTAL * 100) + '%';
  const label = fmt(done) + ' / ' + fmt(TOTAL);
  if (label !== lastLabel) { dimLabel.textContent = label; lastLabel = label; }
}
dim.addEventListener('click', ev => {
  const r = dim.getBoundingClientRect();
  const ms = clamp((ev.clientX - r.left) / r.width, 0, 1) * TOTAL;
  let idx = 0;
  STARTS.forEach((st, k) => { if (ms >= st) idx = k; });
  go(idx);
});

/* ---------- schriftveld (bijschrift) ---------- */
function captionHTML(i, c) {
  return {
    no: String(i + 1).padStart(2, '0') + '<small>/' + String(SCENES.length).padStart(2, '0') + '</small>',
    eyebrow: c.eyebrow, title: c.title, text: c.text
  };
}
function caption(sc, custom) {
  const c = captionHTML(E.i, custom || sc);
  tbNo.innerHTML = c.no;
  tbEyebrow.textContent = c.eyebrow;
  tbTitle.textContent = c.title;
  tbText.innerHTML = c.text;
}
function sizeTB() {
  const probe = tb.cloneNode(true);
  probe.removeAttribute('id');
  probe.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  probe.style.cssText = 'position:absolute;visibility:hidden;left:0;top:0;min-height:0;width:' + tb.getBoundingClientRect().width + 'px';
  app.appendChild(probe);
  let max = 0;
  const all = SCENES.concat(EXTRA_CAPTIONS);
  all.forEach(s => {
    probe.querySelector('.tb-k + .eyebrow, .tb-head .eyebrow').textContent = s.eyebrow;
    probe.querySelector('.tb-title').textContent = s.title;
    probe.querySelector('.tb-text').innerHTML = s.text;
    max = Math.max(max, probe.offsetHeight);
  });
  probe.remove();
  tb.style.minHeight = Math.ceil(max) + 'px';
}
const EXTRA_CAPTIONS = [];

/* ---------- canvas schalen ---------- */
function fit() {
  const r = stage.getBoundingClientRect();
  const s = Math.min((r.width - 14) / 360, (r.height - 14) / 440);
  E.scale = Math.max(.3, s);
  cwrap.style.width = (360 * E.scale) + 'px';
  cwrap.style.height = (440 * E.scale) + 'px';
  canvas.style.transform = 'scale(' + E.scale + ')';
}

/* ---------- scherm aan houden tijdens afspelen ---------- */
let lock = null;
async function wake(on) {
  try {
    if (on) {
      if (!lock && 'wakeLock' in navigator && document.visibilityState === 'visible') {
        lock = await navigator.wakeLock.request('screen');
        lock.addEventListener('release', () => { lock = null; });
      }
    } else if (lock) {
      const l = lock; lock = null; await l.release();
    }
  } catch (err) { lock = null; }
}

/* ---------- toast ---------- */
const toastEl = $('#toast');
let toastTimer = 0;
function toast(text, action, ms) {
  toastEl.innerHTML = '<span style="flex:1">' + text + '</span>';
  if (action) {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = action.label;
    b.addEventListener('click', () => { hideToast(); action.fn(); });
    toastEl.appendChild(b);
  }
  const x = document.createElement('button');
  x.type = 'button'; x.className = 'x'; x.setAttribute('aria-label', 'Sluiten'); x.innerHTML = icon('close');
  x.querySelector('svg').style.cssText = 'width:16px;height:16px';
  x.addEventListener('click', hideToast);
  toastEl.appendChild(x);
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, ms || 4200);
}
function hideToast() { toastEl.classList.remove('show'); }

/* ---------- installeren als app ---------- */
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = () => /Android/i.test(navigator.userAgent);
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', ev => { ev.preventDefault(); deferredPrompt = ev; renderInstall(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; renderInstall(); toast('Geïnstalleerd. Je vindt de offertestraat nu tussen je apps.'); });
function renderInstall() {
  const box = $('#install');
  if (!box) return;
  if (isStandalone()) {
    box.innerHTML = '<h3>Als app op je telefoon</h3><p class="ok">Je gebruikt nu de app-versie.</p>';
    return;
  }
  let html = '<h3>Als app op je telefoon</h3>';
  if (deferredPrompt) {
    html += '<p>Installeer de offertestraat met één tik. Daarna open je hem vanaf je beginscherm, schermvullend.</p><button type="button" class="btn-wide" id="doInstall">App installeren</button>';
  } else if (isIOS()) {
    html += '<ol><li>Open deze pagina in <b>Safari</b>.</li><li>Tik op <b>Deel</b> (vierkantje met pijl omhoog).</li><li>Kies <b>Zet op beginscherm</b> en tik op <b>Voeg toe</b>.</li></ol>';
  } else if (isAndroid()) {
    html += '<ol><li>Open deze pagina in <b>Chrome</b>.</li><li>Tik op het menu <b>⋮</b> rechtsboven.</li><li>Kies <b>App installeren</b> of <b>Toevoegen aan startscherm</b>.</li></ol>';
  } else {
    html += '<p>Open deze pagina op je telefoon. iPhone: Safari → Deel → <b>Zet op beginscherm</b>. Android: Chrome → ⋮ → <b>App installeren</b>.</p>';
  }
  box.innerHTML = html;
  const b = $('#doInstall');
  if (b) b.addEventListener('click', async () => {
    try { deferredPrompt.prompt(); await deferredPrompt.userChoice; } catch (err) { /* */ }
    deferredPrompt = null; renderInstall();
  });
}

/* ---------- stappen-menu ---------- */
function buildSheet() {
  $('#sceneList').innerHTML = SCENES.map((s, k) =>
    '<li><button type="button" data-i="' + k + '"><span class="n">' + String(k + 1).padStart(2, '0') + '</span><span class="t">' + s.menu + '</span><span class="e">' + fmt(s.duration) + '</span></button></li>'
  ).join('');
  $$('#sceneList button').forEach(b => b.addEventListener('click', () => { closeSheet(); go(+b.dataset.i); }));
  $('#autoSwitch').checked = E.auto;
  renderInstall();
}
function markSheet() {
  $$('#sceneList button').forEach(b => {
    if (+b.dataset.i === E.i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
  });
}
let resumeAfterSheet = false;
function openSheet(focusInstall) {
  resumeAfterSheet = E.playing;
  if (E.playing) pause();
  markSheet();
  renderInstall();
  if (typeof sheet.showModal === 'function') sheet.showModal(); else sheet.setAttribute('open', '');
  if (focusInstall) { const box = $('#install'); if (box) box.scrollIntoView({ block: 'center' }); }
}
function closeSheet() {
  if (sheet.open) { if (typeof sheet.close === 'function') sheet.close(); else sheet.removeAttribute('open'); }
}
sheet.addEventListener('close', () => { if (resumeAfterSheet) { resumeAfterSheet = false; play(); } });
sheet.addEventListener('click', ev => { if (ev.target === sheet) closeSheet(); });
$('#sheetClose').addEventListener('click', closeSheet);
$('#autoSwitch').addEventListener('change', ev => setAuto(ev.target.checked));

function setAuto(on) {
  E.auto = on;
  bAuto.setAttribute('aria-pressed', String(on));
  $('#autoSwitch').checked = on;
  try { localStorage.setItem('ostraat-auto', on ? '1' : '0'); } catch (err) { /* */ }
  if (on && E.atEnd && !SCENES[E.i].hold && E.i < SCENES.length - 1) setTimeout(() => go(E.i + 1), 700);
}

/* ---------- bediening ---------- */
bPrev.addEventListener('click', () => go(E.i - 1));
bNext.addEventListener('click', () => go(E.i + 1));
bPlay.addEventListener('click', toggle);
bList.addEventListener('click', () => openSheet(false));
bAuto.addEventListener('click', () => {
  setAuto(!E.auto);
  toast(E.auto ? 'Automatisch doorspelen staat aan.' : 'Automatisch doorspelen staat uit. Tik op › voor de volgende stap.', null, 2600);
});
document.addEventListener('keydown', ev => {
  if (sheet.open || ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (ev.key === 'ArrowRight' || ev.key === 'PageDown') { ev.preventDefault(); go(E.i + 1); }
  else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { ev.preventDefault(); go(E.i - 1); }
  else if (ev.key === ' ' || ev.key === 'k') { if (document.activeElement && document.activeElement.tagName === 'BUTTON' && ev.key === ' ') return; ev.preventDefault(); toggle(); }
  else if (ev.key === 'Home') { go(0); }
});
let sw = null;
stage.addEventListener('pointerdown', ev => { sw = { x: ev.clientX, y: ev.clientY, t: Date.now() }; });
stage.addEventListener('pointerup', ev => {
  if (!sw) return;
  const dx = ev.clientX - sw.x, dy = ev.clientY - sw.y, dt = Date.now() - sw.t;
  sw = null;
  if (dt < 700 && Math.abs(dx) > 50 && Math.abs(dy) < 60) go(E.i + (dx < 0 ? 1 : -1));
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && E.playing) { E.hiddenPause = true; pause(); }
  else if (document.visibilityState === 'visible' && E.hiddenPause) { E.hiddenPause = false; play(); }
});

/* ---------- opstarten ---------- */
function boot() {
  try { const a = localStorage.getItem('ostraat-auto'); if (a !== null) E.auto = a === '1'; } catch (err) { /* */ }
  bAuto.setAttribute('aria-pressed', String(E.auto));
  buildMini();
  buildDim();
  buildSheet();
  bPrev.innerHTML = icon('prev');
  bNext.innerHTML = icon('next');
  bList.innerHTML = icon('list') + '<span>Stappen</span>';
  $('#sheetClose').innerHTML = icon('close');
  bAuto.innerHTML = icon('auto');
  sizeTB();
  fit();
  new ResizeObserver(() => fit()).observe(stage);
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeTB(); fit(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizeTB(); fit(); });
  window.__straat = { go, play, pause, E, SCENES, setAuto };
  go(0);
  let seen = false;
  try { seen = localStorage.getItem('ostraat-hint') === '1'; } catch (err) { /* */ }
  if (!isStandalone() && !seen && (isIOS() || isAndroid())) {
    setTimeout(() => {
      toast('Tip: zet de offertestraat op je beginscherm, dan opent hij als app.', { label: 'Hoe?', fn: () => openSheet(true) }, 7000);
      try { localStorage.setItem('ostraat-hint', '1'); } catch (err) { /* */ }
    }, 2500);
  }
}

/* =========================================================================
   Scènes 1–4: introductie, het team, binnenkomst, Lees-agent
   ========================================================================= */

/* 1 — Introductie ------------------------------------------------------- */
SCENES.push({
  id: 'intro', menu: 'Introductie',
  eyebrow: 'Introductie',
  title: 'Van mail tot calculatie',
  text: 'Een offerteaanvraag gaat langs een straat van vijf Claude-agents. Elke agent heeft één taak. Aan het eind controleert ' + CFG.controleur + ' het resultaat.',
  duration: 7000, hold: true, station: null,
  build(L, tl) {
    const XS = [28, 84, 140, 196, 252];
    const keys = ['a1', 'a2', 'a3', 'a4', 'a5'];
    L.innerHTML =
      '<div class="sc sc-intro">' +
        '<div class="eyebrow">' + CFG.bedrijf + ' — ' + CFG.versie + '</div>' +
        '<h1 class="big">De<br><span class="hl-blue" id="iTitle">offertestraat</span></h1>' +
        '<p class="lede">Hoe Claude-agents samen een offerteaanvraag afhandelen.</p>' +
        '<div class="belt" aria-hidden="true">' +
          '<svg class="belt-svg" viewBox="0 0 332 150">' +
            XS.map(x => '<line class="arm" data-x="' + x + '" x1="' + x + '" y1="50" x2="' + x + '" y2="86"/>').join('') +
            '<rect class="belt-body" x="4" y="94" width="276" height="16" rx="8"/>' +
            Array.from({ length: 17 }, (_, k) => '<circle class="roller" cx="' + (12 + k * 16.25) + '" cy="102" r="4"/>').join('') +
            '<line class="belt-run" x1="10" y1="94" x2="274" y2="94"/>' +
            '<path class="leg" d="M40 110v22M244 110v22M30 132h20M234 132h20"/>' +
            '<line class="floor" x1="0" y1="133" x2="332" y2="133"/>' +
          '</svg>' +
          XS.map((x, k) => '<div class="belt-st" style="left:' + x + 'px">' + tile(keys[k], 'tile--sm') + '</div>').join('') +
          '<div class="belt-r" id="iRich">' + tile('richard') + '<span>' + CFG.controleur + '</span><i class="okbadge">' + icon('check') + '</i></div>' +
          '<div class="belt-item" id="iItem"><span class="ic">' + icon('mail') + '</span></div>' +
        '</div>' +
        '<div class="intro-cta">' +
          '<button type="button" class="cbtn cbtn--main" id="startBtn">' + icon('play') + 'Start de animatie</button>' +
          '<span class="muted">Ruim 2 minuten · veeg of tik › om te bladeren</span>' +
        '</div>' +
      '</div>';
    $('#startBtn', L).addEventListener('click', () => go(1));
    tl.add(350, $('#iTitle', L), 'on');
    const item = $('#iItem', L), ic = $('.ic', item), rich = $('#iRich', L);
    const sts = $$('.belt-st .tile', L), arms = $$('.arm', L);
    let form = 'mail';
    const morph = f => { if (f !== form) { form = f; ic.innerHTML = icon(f); } };
    const CYCLE = 7000;
    tl.loop(t => {
      const c = t % CYCLE;
      let x, y = 71, o = 1, s = 1;
      if (c < 400) { x = -24; o = c / 400; }
      else if (c < 5000) { x = -24 + EASE.io((c - 400) / 4600) * 290; }
      else if (c < 5700) { const p = EASE.out((c - 5000) / 700); x = 266 + p * 30; y = 71 + p * 16; s = 1 - p * .25; o = 1 - p; }
      else { x = 296; o = 0; }
      morph(x > 250 ? 'sheet' : x > 70 ? 'tag' : 'mail');
      item.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
      item.style.opacity = o;
      const cx = x + 15;
      XS.forEach((sx, k) => {
        const on = o > .2 && Math.abs(cx - sx) < 16;
        sts[k].classList.toggle('active', on);
        arms[k].classList.toggle('on', on);
      });
      rich.classList.toggle('done', c > 5500 && c < 6900);
    });
  }
});

/* 2 — Het team ---------------------------------------------------------- */
SCENES.push({
  id: 'team', menu: 'Het team',
  eyebrow: 'Het team',
  title: 'Vijf agents, één dossier',
  text: 'Elke agent doet één taak. Ze geven hun werk aan elkaar door via een gedeeld dossier, zodat er geen informatie verloren gaat. ' + CFG.controleur + ' is de mens die meekijkt.',
  duration: 9500, station: 'all',
  build(L, tl) {
    const HUB = [180, 230];
    const POS = { a1: [180, 68], a2: [280, 152], a3: [280, 308], a4: [180, 388], a5: [80, 308], richard: [80, 152] };
    const order = ['a1', 'a2', 'a3', 'a4', 'a5', 'richard'];
    L.innerHTML =
      '<div class="sc sc-team">' +
        '<svg class="spokes" viewBox="0 0 360 440" aria-hidden="true">' +
          order.map(k => '<line class="spoke" data-k="' + k + '" x1="' + HUB[0] + '" y1="' + HUB[1] + '" x2="' + POS[k][0] + '" y2="' + POS[k][1] + '"/>').join('') +
        '</svg>' +
        '<div class="hub">' + icon('tag') + '<b>Dossier</b><span class="mono">' + CFG.dossier + '</span></div>' +
        order.map(k => {
          const a = AGENTS[k];
          return '<div class="tcard pop" data-k="' + k + '" style="left:' + POS[k][0] + 'px;top:' + POS[k][1] + 'px">' +
            tile(k, 'tile--sm') + '<div><b>' + (a.short || a.name) + '</b><span>' + a.role + '</span></div></div>';
        }).join('') +
        '<div class="sticky pop team-sticky">Zorgen dat alles goed in verbinding staat!</div>' +
        '<div class="legend">' +
          '<span><i class="lg lg-agent"></i>Claude-agent</span>' +
          '<span><i class="lg lg-human"></i>mens</span>' +
          '<span><i class="lg lg-dos"></i>gedeeld dossier</span>' +
        '</div>' +
      '</div>';
    order.forEach((k, n) => {
      tl.add(250 + n * 260, $('.spoke[data-k="' + k + '"]', L), 'in');
      tl.add(300 + n * 260, $('.tcard[data-k="' + k + '"]', L), 'in');
    });
    tl.add(2100, $('.team-sticky', L), 'in');
    // agents praten met elkaar via het dossier
    const hops = [['a1', 'a2'], ['a2', 'a3'], ['a3', 'a4'], ['a2', 'a5'], ['a5', 'richard']];
    const dot = el('<div class="dot-token"></div>');
    L.firstElementChild.appendChild(dot);
    dot.style.opacity = 0;
    const T0 = 2700, LEG = 520, GAP = 180;
    hops.forEach(([from, to], n) => {
      const t0 = T0 + n * (LEG * 2 + GAP);
      const A = POS[from], B = POS[to];
      tl.at(t0, () => { $('.tcard[data-k="' + from + '"]', L).classList.add('talk'); dot.style.opacity = 1; });
      tl.tween(t0, LEG, p => { dot.style.transform = 'translate(' + (A[0] + (HUB[0] - A[0]) * p) + 'px,' + (A[1] + (HUB[1] - A[1]) * p) + 'px)'; });
      tl.at(t0 + LEG, () => { $('.hub', L).classList.add('ping'); setTimeout(() => $('.hub', L) && $('.hub', L).classList.remove('ping'), 300); });
      tl.tween(t0 + LEG, LEG, p => { dot.style.transform = 'translate(' + (HUB[0] + (B[0] - HUB[0]) * p) + 'px,' + (HUB[1] + (B[1] - HUB[1]) * p) + 'px)'; });
      tl.at(t0 + LEG * 2, () => {
        $('.tcard[data-k="' + from + '"]', L).classList.remove('talk');
        $('.tcard[data-k="' + to + '"]', L).classList.add('talk');
        dot.style.opacity = 0;
      });
      tl.at(t0 + LEG * 2 + GAP, () => $('.tcard[data-k="' + to + '"]', L).classList.remove('talk'));
    });
  }
});

/* 3 — Er komt een aanvraag binnen --------------------------------------- */
SCENES.push({
  id: 'inbox', menu: 'Aanvraag komt binnen',
  eyebrow: 'Stap 1 · binnenkomst',
  title: 'Er komt een aanvraag binnen',
  text: 'Een klant mailt een offerteaanvraag. Via de koppeling met Outlook ziet de Lees-agent de nieuwe mail meteen.',
  duration: 8500, station: 'klant',
  build(L, tl) {
    const K = CFG.klant;
    L.innerHTML =
      '<div class="sc">' +
        '<div class="win mailapp">' +
          '<div class="win-bar">' + icon('mail') + 'Postvak IN<span class="tag">Outlook</span></div>' +
          '<div class="mrow new" id="mNew"><i class="unread"></i>' +
            '<div class="mline"><b>' + K.naam + '</b><time class="mono">09:14</time></div>' +
            '<div class="msubj">Offerteaanvraag rechthoekige bak</div>' +
            '<div class="mprev">Goedemorgen, wij zoeken een rechthoekige kunststof bak van…</div>' +
          '</div>' +
          '<div class="mrow old"><div class="mline"><b>Planning</b><time class="mono">09:02</time></div><div class="msubj">Levering week 39</div></div>' +
          '<div class="mrow old"><div class="mline"><b>Inkoop</b><time class="mono">08:47</time></div><div class="msubj">Orderbevestiging PE-plaat</div></div>' +
          '<div class="mread" id="mRead"><div class="win-body">' +
            '<div class="mail-meta"><b>Van</b><span>' + K.naam + ' · ' + K.bedrijf + '</span><b>Onderwerp</b><span>Offerteaanvraag rechthoekige bak</span></div>' +
            '<div class="mail-text">Goedemorgen,\n\nWij zoeken een rechthoekige kunststof bak van 2000 × 1000 × 800 mm (l × b × h). Kunt u hiervoor een offerte sturen?\n\nMet vriendelijke groet,\n' + K.naam + '\n' + K.bedrijf + ' · ' + K.plaats + '</div>' +
          '</div></div>' +
        '</div>' +
        '<div class="kop rv" id="kop">' +
          '<span class="kop-ic">' + icon('plug') + '</span>' +
          '<span class="kop-t"><b>Outlook-koppeling</b><span>nieuwe mail → agent start</span></span>' +
          '<span class="kop-line"><i class="kop-dot" id="kopDot"></i></span>' +
          tile('a1', 'tile--sm') +
        '</div>' +
      '</div>';
    const row = $('#mNew', L);
    tl.add(700, row, 'in');
    tl.add(1500, row, 'sel');
    tl.at(2100, () => { $$('.mrow.old', L).forEach(n => n.classList.add('gone')); $('#mRead', L).classList.add('in'); row.classList.add('read'); });
    tl.add(4300, $('#kop', L), 'in');
    const dot = $('#kopDot', L);
    tl.tween(4900, 900, p => { dot.style.left = (p * 100) + '%'; dot.style.opacity = p < .95 ? 1 : 0; }, EASE.io);
    tl.at(5800, () => { $('#kop .tile', L).classList.add('active'); });
    tl.mini(5800, 'a1');
  }
});

/* 4 — Lees-agent -------------------------------------------------------- */
SCENES.push({
  id: 'lees', menu: 'Lees-agent: mails lezen',
  eyebrow: 'Stap 2 · agent 1',
  title: 'Lees-agent: mails lezen',
  text: 'De Lees-agent leest de mail en haalt de belangrijke gegevens eruit: welke klant, welk product en welke maten. Alles gaat in het gedeelde dossier.',
  duration: 9800, station: 'a1',
  build(L, tl) {
    const K = CFG.klant;
    L.innerHTML =
      '<div class="sc">' +
        '<div class="agent-head">' + tile('a1') + '<div class="who"><span class="agent-name">Lees-agent</span><span class="agent-role">Agent 1 · mails lezen</span></div>' + pill('', 'wacht') + '</div>' +
        '<div class="win scanwin" id="scanWin"><div class="win-body">' +
          '<div class="mail-text">…wij zoeken een <span class="mark" id="kProduct">rechthoekige kunststof bak</span> van <span class="mark" id="kMaten">2000 × 1000 × 800 mm</span> (l × b × h). Kunt u hiervoor een offerte sturen?\nMet vriendelijke groet,\n' + K.naam + ' · <span class="mark" id="kKlant">' + K.bedrijf + '</span></div>' +
        '</div><i class="scanline" id="scanLine"></i></div>' +
        '<div class="flow-down">' + icon('arrowd') + '<span>naar het dossier</span></div>' +
        dossierHTML({}) +
        '<div class="msg pop handoff" id="hand4" style="top:60px">' +
          '<div class="msg-route">' + tile('a1', 'tile--sm') + icon('arrow', 'arr') + tile('a2', 'tile--sm') + '<span>bericht</span></div>' +
          '<div>Klant, product en maten staan in het dossier. Wil jij checken wat er nog ontbreekt?</div>' +
        '</div>' +
      '</div>';
    const p = $('.agent-head .pill', L);
    const dos = $('.dos', L);
    tl.pill(350, p, 'busy', 'leest…');
    const line = $('#scanLine', L);
    tl.tween(350, 3400, q => { line.style.top = (q * 100) + '%'; line.style.opacity = q < .97 ? 1 : 0; }, EASE.lin);
    const steps = [['#kProduct', 'product', 'Rechthoekige bak', 800], ['#kMaten', 'maten', '2000 × 1000 × 800 mm', 1800], ['#kKlant', 'klant', K.bedrijf, 2900]];
    steps.forEach(([sel, k, txt, t]) => {
      tl.add(t, $(sel, L), 'on');
      tl.fly(t + 380, $(sel, L), $('.dos-r[data-k="' + k + '"] .v', L), txt, () => setRow(dos, k, 'ok'));
    });
    tl.pill(4400, p, 'done', 'klaar');
    tl.at(5000, () => { const w = $('#scanWin', L), hnd = $('#hand4', L); hnd.style.top = w.offsetTop + 'px'; hnd.style.minHeight = w.offsetHeight + 'px'; w.classList.add('gone'); });
    tl.add(5100, $('#hand4', L), 'in');
    tl.at(5300, () => $('#hand4 .tile[data-k="a2"]', L).classList.add('active'));
  }
});

/* =========================================================================
   Scènes 5–8: Aanvul-agent, Tone-of-voice-agent, Verzend-agent, antwoord
   ========================================================================= */
function handoffHTML(from, to, text, id) {
  return '<div class="msg compact pop" id="' + id + '">' +
    '<div class="msg-route">' + tile(from, 'tile--sm') + icon('arrow', 'arr') + tile(to, 'tile--sm') + '</div>' +
    '<div>' + text + '</div></div>';
}
function decisionHTML(id) {
  return '<div class="decide rv" id="' + id + '">' +
    '<div class="diamond"><svg viewBox="0 0 126 58" aria-hidden="true"><polygon points="63,2 124,29 63,56 2,29"/></svg><span>Compleet?</span></div>' +
    '<div class="verdict"></div></div>';
}
function setVerdict(root, yes, big, small) {
  const d = root.querySelector('.diamond'), v = root.querySelector('.verdict');
  d.classList.add(yes ? 'yes' : 'no');
  v.className = 'verdict pop ' + (yes ? 'yes' : 'no');
  v.innerHTML = icon(yes ? 'checkc' : 'alert') + '<div><div>' + big + '</div><small>' + small + '</small></div>';
  void v.offsetWidth;
  v.classList.add('in');
}

/* 5 — Aanvul-agent ------------------------------------------------------- */
SCENES.push({
  id: 'aanvul', menu: 'Aanvul-agent: controleren',
  eyebrow: 'Stap 3 · agent 2',
  title: 'Aanvul-agent: informatie aanvullen',
  text: 'De agent pakt de checklist uit de map ‘Rechthoekige bakken’. Wat hij zelf kan vinden, vult hij aan. Wat echt ontbreekt, zet hij klaar om na te vragen.',
  duration: 11000, station: 'a2',
  build(L, tl) {
    L.innerHTML =
      '<div class="sc">' +
        '<div class="agent-head">' + tile('a2') + '<div class="who"><span class="agent-name">Aanvul-agent</span><span class="agent-role">Agent 2 · info aanvullen</span></div>' + pill('', 'wacht') + '</div>' +
        '<div class="folders">' +
          '<span class="fold" id="fRect">' + icon('folder') + 'Rechthoekige bakken</span>' +
          '<span class="fold" id="fRond">' + icon('folder') + 'Ronde bakken</span></div>' +
        dossierHTML({ klant: 'ok', product: 'ok', maten: 'ok' }).replace('class="dos"', 'class="dos dos--compact"') +
        decisionHTML('dec5') +
        handoffHTML('a2', 'a3', 'Toepassing en aantal ontbreken. Kun jij de klant netjes mailen?', 'hand5') +
      '</div>';
    const p = $('.agent-head .pill', L), dos = $('.dos', L);
    tl.pill(300, p, 'busy', 'controleert…');
    tl.add(600, $('#fRect', L), 'sel');
    tl.add(600, $('#fRond', L), 'dim');
    tl.at(900, () => { const h = $('.dos-h span', L); h.textContent = 'Checklist rechthoekige bak'; });
    ['klant', 'product', 'maten'].forEach((k, n) => {
      tl.at(1300 + n * 380, () => { const r = $('.dos-r[data-k="' + k + '"]', L); r.classList.add('flash', 'chk'); setTimeout(() => r.classList.remove('flash'), 600); });
    });
    tl.at(2600, () => {
      const r = $('.dos-r[data-k="adres"]', L);
      r.classList.add('chk');
      r.querySelector('.v').innerHTML = '<span class="seek">' + icon('read') + 'zoekt in handtekening…</span>';
    });
    tl.at(3700, () => setRow(dos, 'adres', 'added'));
    tl.at(4400, () => setRow(dos, 'toepassing', 'miss'));
    tl.at(5000, () => setRow(dos, 'aantal', 'miss'));
    tl.add(5700, $('#dec5', L), 'in');
    tl.at(6200, () => setVerdict($('#dec5', L), false, 'Nee', '2 gegevens ontbreken'));
    tl.pill(6400, p, 'miss', '2 ontbreken');
    tl.add(7200, $('#hand5', L), 'in');
    tl.at(7400, () => $('#hand5 .tile[data-k="a3"]', L).classList.add('active'));
  }
});

/* 6 — Tone-of-voice-agent ------------------------------------------------ */
SCENES.push({
  id: 'tone', menu: 'Tone-of-voice-agent: mail opstellen',
  eyebrow: 'Stap 4 · agent 3',
  title: 'Tone-of-voice-agent: mail opstellen',
  text: 'De agent schrijft de klant in de stijl van ' + CFG.bedrijf.split(' ')[0] + ': persoonlijk, helder en met alleen de vragen die echt nodig zijn.',
  duration: 11000, station: 'a3',
  build(L, tl) {
    const K = CFG.klant;
    const body = 'Beste ' + K.aanhef + ',\n\nBedankt voor uw aanvraag. Voor een passende offerte hebben we nog twee gegevens nodig:\n1. Wat komt er in de bak?\n2. Hoeveel stuks heeft u nodig?\n\nMet vriendelijke groet,\n' + CFG.bedrijf;
    L.innerHTML =
      '<div class="sc">' +
        '<div class="agent-head">' + tile('a3') + '<div class="who"><span class="agent-name">Tone of voice</span><span class="agent-role">Agent 3 · onze stijl</span></div>' + pill('', 'wacht') + '</div>' +
        '<div class="tone"><span class="tone-k">Toon</span>' +
          ['Persoonlijk', 'Helder', 'Vriendelijk', 'Kort'].map(t => '<span class="tchip">' + t + '</span>').join('') + '</div>' +
        '<div class="win compose">' +
          '<div class="win-bar">' + icon('pen') + 'Re: Offerteaanvraag<span class="tag">concept</span></div>' +
          '<div class="win-body"><div class="mail-meta"><b>Aan</b><span>' + K.naam + ' · ' + K.bedrijf + '</span></div>' +
          '<div class="mail-text"><span id="tBody"></span><i class="caret"></i></div></div>' +
        '</div>' +
        handoffHTML('a3', 'a4', 'Concept staat klaar. Eerst langs ' + CFG.controleur + ', dan versturen?', 'hand6') +
      '</div>';
    const p = $('.agent-head .pill', L);
    tl.pill(300, p, 'busy', 'schrijft…');
    const end = tl.type(600, $('#tBody', L), body, 42);
    const chips = $$('.tchip', L);
    [.12, .38, .62, .9].forEach((f, n) => tl.add(600 + (end - 600) * f, chips[n], 'on'));
    tl.at(end + 200, () => { const c = $('.caret', L); if (c) c.remove(); });
    tl.pill(end + 300, p, 'done', 'concept klaar');
    tl.add(end + 900, $('#hand6', L), 'in');
    tl.at(end + 1100, () => $('#hand6 .tile[data-k="a4"]', L).classList.add('active'));
  }
});

/* 7 — Richard kijkt mee + Verzend-agent ---------------------------------- */
SCENES.push({
  id: 'verzend', menu: 'Verzend-agent: mail versturen',
  eyebrow: 'Stap 5 · agent 4',
  title: 'Verzend-agent: mail versturen',
  text: 'Als je dat wilt, keurt ' + CFG.controleur + ' de mail eerst goed. Daarna verstuurt de Verzend-agent hem via Outlook. Zonder controle gaat hij direct.',
  duration: 10000, station: 'richard',
  build(L, tl) {
    const K = CFG.klant, R = CFG.controleur;
    L.innerHTML =
      '<div class="sc sc-send">' +
        '<div class="toggle-row"><span>Mail eerst laten controleren</span><span class="fake-switch on" aria-hidden="true"></span></div>' +
        '<div class="note-row"><svg class="note-arrow" viewBox="0 0 60 34" aria-hidden="true"><path d="M4 30 C 18 30, 40 26, 52 6 M44 8 l8 -3 1 9"/></svg>' +
          '<span class="hand write" id="n7">' + R + ' kan het ook eerst controleren</span></div>' +
        '<div class="win approve" id="appr">' +
          '<div class="appr-h">' + tile('richard', 'tile--sm') + '<b>Ter controle bij ' + R + '</b><time class="mono">09:15</time></div>' +
          '<div class="appr-prev">Beste ' + K.aanhef + ',<br>Bedankt voor uw aanvraag. Voor een passende offerte hebben we nog twee gegevens nodig…</div>' +
          '<div class="appr-btns"><button type="button" class="cbtn" tabindex="-1">' + icon('pen') + 'Aanpassen</button>' +
            '<button type="button" class="cbtn cbtn--main" id="okBtn" tabindex="-1">' + icon('check') + 'Goedkeuren</button></div>' +
          '<div class="stamp" id="stamp7">Goedgekeurd<small>' + R + ' · 09:16</small></div>' +
        '</div>' +
        '<div class="agent-head">' + tile('a4') + '<div class="who"><span class="agent-name">Verzend-agent</span><span class="agent-role">Agent 4 · versturen</span></div>' + pill('', 'wacht') + '</div>' +
        '<div class="route"><span class="route-l">via Outlook</span>' +
          '<div class="route-k">' + tile('klant') + '<span>' + K.bedrijf + '</span><i class="okbadge">' + icon('check') + '</i></div></div>' +
        '<svg class="flight" viewBox="0 0 360 440" aria-hidden="true"><path class="fpath" id="fPath"/><path class="fpath done" id="fDone"/></svg>' +
        '<div class="plane" id="plane7">' + icon('send') + '</div>' +
        '<div class="tap" id="tap7"></div>' +
      '</div>';
    tl.add(400, $('#n7', L), 'in');
    tl.add(1300, $('.note-arrow', L), 'in');
    const tap = $('#tap7', L), btn = $('#okBtn', L);
    tl.at(1900, () => { const r = rel(btn); tap.style.left = (r.x + r.w * .62) + 'px'; tap.style.top = (r.y + r.h * .55) + 'px'; tap.classList.add('in'); });
    tl.add(2400, tap, 'press');
    tl.add(2450, btn, 'pressed');
    tl.add(2650, $('#stamp7', L), 'in');
    tl.add(2800, tap, 'out');
    const p = $$('.agent-head .pill', L)[0];
    tl.mini(3200, 'a4');
    tl.pill(3300, p, 'busy', 'verstuurt…');
    const plane = $('#plane7', L), fPath = $('#fPath', L), fDone = $('#fDone', L);
    let A, B, C, len = 0;
    const qb = (q, i) => (1 - q) * (1 - q) * A[i] + 2 * q * (1 - q) * C[i] + q * q * B[i];
    tl.at(3400, () => {
      const a = rel($('.sc-send .agent-head .tile', L)), b = rel($('.route-k .tile', L));
      A = [a.x + a.w / 2, a.y + a.h / 2]; B = [b.x + b.w / 2, b.y + b.h / 2];
      C = [(A[0] + B[0]) / 2, Math.max(A[1], B[1]) + 34];
      const d = 'M' + A[0] + ' ' + A[1] + ' Q' + C[0] + ' ' + C[1] + ' ' + B[0] + ' ' + B[1];
      fPath.setAttribute('d', d); fDone.setAttribute('d', d);
      len = fDone.getTotalLength();
      fDone.style.strokeDasharray = len; fDone.style.strokeDashoffset = len;
      $('.flight', L).classList.add('in');
      plane.style.opacity = 1;
    });
    tl.tween(3500, 1700, q => {
      if (!A) return;
      const x = qb(q, 0), y = qb(q, 1);
      const dx = 2 * (1 - q) * (C[0] - A[0]) + 2 * q * (B[0] - C[0]);
      const dy = 2 * (1 - q) * (C[1] - A[1]) + 2 * q * (B[1] - C[1]);
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      plane.style.transform = 'translate(' + (x - 13) + 'px,' + (y - 13) + 'px) rotate(' + (ang + 45) + 'deg)';
      fDone.style.strokeDashoffset = len * (1 - q);
    }, EASE.io);
    tl.at(5200, () => { plane.style.opacity = 0; $('.route-k', L).classList.add('done'); });
    tl.pill(5300, p, 'done', 'verzonden');
  }
});

/* 8 — De klant antwoordt ------------------------------------------------- */
SCENES.push({
  id: 'antwoord', menu: 'De klant antwoordt',
  eyebrow: 'Stap 6 · antwoord',
  title: 'De klant antwoordt',
  text: 'Het antwoord komt in hetzelfde dossier. De Lees-agent haalt de nieuwe gegevens eruit, de Aanvul-agent controleert opnieuw: de aanvraag is compleet.',
  duration: 10000, station: 'klant',
  build(L, tl) {
    const K = CFG.klant;
    L.innerHTML =
      '<div class="sc">' +
        '<div class="later"><span class="clock">' + icon('clock') + '<b class="mono">13:42</b> later die dag</span>' +
          '<span class="later-agents">' + tile('a1', 'tile--sm') + tile('a2', 'tile--sm') + '</span></div>' +
        '<div class="win rv" id="reply">' +
          '<div class="win-bar">' + icon('mail') + 'Re: Offerteaanvraag<span class="tag">Outlook</span></div>' +
          '<div class="win-body"><div class="mail-text"><b>' + K.naam + '</b>\nHet is voor <span class="mark" id="kT">voedingswater</span>. We hebben er <span class="mark" id="kA">3</span> nodig.\nGroet, Mark</div></div>' +
        '</div>' +
        dossierHTML({ klant: 'ok', product: 'ok', maten: 'ok', adres: 'added', toepassing: 'miss', aantal: 'miss' }).replace('class="dos"', 'class="dos dos--compact"') +
        decisionHTML('dec8') +
      '</div>';
    const dos = $('.dos', L), ts = $$('.later-agents .tile', L);
    tl.add(500, $('#reply', L), 'in');
    tl.at(1500, () => ts[0].classList.add('active'));
    tl.mini(1500, 'a1');
    tl.add(1700, $('#kT', L), 'on');
    tl.fly(2050, $('#kT', L), $('.dos-r[data-k="toepassing"] .v', L), 'Voedingswater', () => setRow(dos, 'toepassing', 'ok'));
    tl.add(2800, $('#kA', L), 'on');
    tl.fly(3150, $('#kA', L), $('.dos-r[data-k="aantal"] .v', L), '3 stuks', () => setRow(dos, 'aantal', 'ok'));
    tl.at(4100, () => { ts[0].classList.remove('active'); ts[1].classList.add('active'); });
    tl.mini(4100, 'a2');
    ROWS.forEach(([k], n) => tl.at(4300 + n * 150, () => { const r = $('.dos-r[data-k="' + k + '"]', L); r.classList.add('flash'); setTimeout(() => r.classList.remove('flash'), 500); }));
    tl.add(5300, $('#dec8', L), 'in');
    tl.at(5800, () => setVerdict($('#dec8', L), true, 'Ja', 'door naar de Excel-agent'));
  }
});

/* =========================================================================
   Scènes 9–10: Excel-agent, Richard controleert
   ========================================================================= */

/* 9 — Excel-agent -------------------------------------------------------- */
SCENES.push({
  id: 'excel', menu: 'Excel-agent: calculatie invullen',
  eyebrow: 'Stap 7 · agent 5',
  title: 'Excel-agent: calculatie invullen',
  text: 'De agent kiest de juiste map, opent het calculatiebestand en vult alle gegevens in. Wat vakkennis vraagt, zoals materiaal en prijs, laat hij open voor ' + CFG.controleur + '.',
  duration: 11000, station: 'a5',
  build(L, tl) {
    const K = CFG.klant, R = CFG.controleur;
    const rows = [
      ['Klant', K.bedrijf], ['Product', 'Rechthoekige bak'],
      ['Lengte (mm)', '2000'], ['Breedte (mm)', '1000'], ['Hoogte (mm)', '800'],
      ['Inhoud (liter)', '1.600', '=B3*B4*B5/1000000'],
      ['Toepassing', 'Voedingswater'], ['Aantal', '3'], ['Afleveradres', K.plaats],
      ['Materiaal en wanddikte', '→ ' + R, null, true], ['Prijs', '→ ' + R, null, true]
    ];
    const file = 'Calculatie_' + K.bedrijf.split(' ').pop() + '_' + CFG.dossier.replace('#', '') + '.xlsx';
    L.innerHTML =
      '<div class="sc">' +
        '<div class="agent-head">' + tile('a5') + '<div class="who"><span class="agent-name">Excel-agent</span><span class="agent-role">Agent 5 · calculatie</span></div>' + pill('', 'wacht') + '</div>' +
        '<div class="folders">' +
          '<span class="fold" id="xRect">' + icon('folder') + 'Rechthoekige bakken</span>' +
          '<span class="fold" id="xRond">' + icon('folder') + 'Ronde bakken</span></div>' +
        '<div class="win xl">' +
          '<div class="win-bar">' + icon('sheet') + '<span class="xl-name" id="xName">Calculatie rechthoekige bak.xlsx</span><span class="tag">Excel</span></div>' +
          '<div class="xl-fx"><i>fx</i><span class="mono" id="xFx"></span></div>' +
          '<div class="xl-grid">' +
            '<div class="xl-h"><span></span><span>A</span><span>B</span></div>' +
            rows.map((r, n) => '<div class="xl-r" data-n="' + n + '"><span class="xl-no">' + (n + 1) + '</span><span class="xl-a">' + r[0] + '</span><span class="xl-b' + (r[3] ? ' todo' : '') + '"></span></div>').join('') +
          '</div>' +
        '</div>' +
      '</div>';
    const p = $('.agent-head .pill', L), fx = $('#xFx', L), name = $('#xName', L);
    const cells = $$('.xl-b', L), rowEls = $$('.xl-r', L);
    tl.pill(300, p, 'busy', 'vult in…');
    tl.add(600, $('#xRect', L), 'sel');
    tl.add(600, $('#xRond', L), 'dim');
    tl.at(1100, () => { name.textContent = file; name.classList.add('flash'); });
    let t = 1500;
    rows.slice(0, 9).forEach((r, n) => {
      tl.at(t, () => {
        rowEls.forEach(e => e.classList.remove('cur'));
        rowEls[n].classList.add('cur');
        fx.textContent = r[2] || r[1];
        if (!r[2]) { cells[n].textContent = r[1]; cells[n].classList.add('set'); }
      });
      if (r[2]) tl.at(t + 320, () => { cells[n].textContent = r[1]; cells[n].classList.add('set', 'calc'); });
      t += r[2] ? 700 : 480;
    });
    tl.at(t, () => {
      rowEls.forEach(e => e.classList.remove('cur'));
      fx.textContent = '';
      [9, 10].forEach(n => { cells[n].textContent = rows[n][1]; cells[n].classList.add('set'); });
    });
    tl.pill(t + 600, p, 'done', 'opgeslagen');
    tl.at(t + 1200, () => {
      const st = $('.st[data-k="richard"]', mini);
      if (st && st.offsetParent) flyToken(L, $('.xl .win-bar', L), st, '', 900, { cls: 'fly fly-doc', html: icon('sheet') + '<span>xlsx</span>', center: true, arc: -40 });
    });
    tl.mini(t + 2000, 'richard');
    tl.pill(t + 2000, p, 'done', 'naar ' + R);
  }
});

/* 10 — Richard controleert ------------------------------------------------ */
SCENES.push({
  id: 'richard', menu: CFG.controleur + ' controleert',
  eyebrow: 'Stap 8 · controle',
  title: CFG.controleur + ' controleert en vult aan',
  text: CFG.controleur + ' krijgt de ingevulde calculatie, controleert die en vult aan wat vakkennis vraagt, zoals materiaal en prijs. Daarna kan de offerte de deur uit.',
  duration: 10500, station: 'richard',
  build(L, tl) {
    const K = CFG.klant, R = CFG.controleur;
    const file = 'Calculatie_' + K.bedrijf.split(' ').pop() + '_' + CFG.dossier.replace('#', '') + '.xlsx';
    const checks = [
      ['Gegevens uit de mail', '7 velden', true],
      ['Inhoud (formule)', '1.600 liter', true],
      ['Materiaal en wanddikte', 'ingevuld', false],
      ['Prijs', 'berekend', false]
    ];
    L.innerHTML =
      '<div class="sc sc-rich">' +
        '<div class="win">' +
          '<div class="win-bar">' + icon('mail') + 'Nieuwe calculatie<span class="tag">Outlook</span></div>' +
          '<div class="win-body notif">' +
            '<div class="mail-meta"><b>Van</b><span>Excel-agent → ' + R + '</span></div>' +
            '<div class="mail-text">Calculatie voor ' + K.bedrijf + ' staat klaar. Twee velden wachten op jou.</div>' +
            '<span class="file" id="att">' + icon('sheet') + file + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="review">' +
          '<div class="review-h">' + tile('richard', 'tile--sm') + '<b>' + R + '</b>' + pill('busy', 'controleert…') + '</div>' +
          checks.map((c, n) => '<div class="rv-row rv" data-n="' + n + '"><span class="rk">' + c[0] + '</span><span class="rvv">' + (c[2] ? c[1] : '<span class="todo">open</span>') + '</span><span class="rs">' + (c[2] ? icon('check') : icon('pen')) + '</span></div>').join('') +
          '<div class="stamp" id="stamp10">Gecontroleerd<small>' + R + ' · 14:05</small></div>' +
        '</div>' +
        '<div class="result rv" id="res">' +
          '<div class="res-doc">' + '<span class="tile tile--tool">' + icon('doc') + '</span><b>Offerte</b></div>' +
          '<span class="res-line"><i id="resDot"></i></span>' +
          '<div class="route-k" id="resK">' + tile('klant') + '<span>' + K.bedrijf + '</span><i class="okbadge">' + icon('check') + '</i></div>' +
        '</div>' +
      '</div>';
    tl.add(500, $('#att', L), 'hl');
    const rr = $$('.rv-row', L);
    tl.add(1100, rr[0], 'in');
    tl.add(1400, rr[1], 'in');
    tl.add(1900, rr[2], 'in');
    tl.add(2000, rr[3], 'in');
    const fill = (n, at) => {
      tl.at(at, () => { rr[n].classList.add('typing'); rr[n].querySelector('.rvv').innerHTML = '<span class="dots"><i></i><i></i><i></i></span>'; });
      tl.at(at + 900, () => {
        rr[n].classList.remove('typing'); rr[n].classList.add('done');
        rr[n].querySelector('.rvv').textContent = checks[n][1];
        rr[n].querySelector('.rs').innerHTML = icon('check');
      });
    };
    fill(2, 2500);
    fill(3, 3700);
    tl.at(4900, () => { const pl = $('.review-h .pill', L); if (pl) pl.style.visibility = 'hidden'; });
    tl.add(5000, $('#stamp10', L), 'in');
    tl.add(5800, $('#res', L), 'in');
    const dot = $('#resDot', L);
    tl.tween(6300, 1100, q => { dot.style.left = (q * 100) + '%'; dot.style.opacity = q < .97 ? 1 : 0; }, EASE.io);
    tl.mini(6300, 'klant');
    tl.add(7400, $('#resK', L), 'done');
  }
});

/* =========================================================================
   Scènes 11–13: overzicht, benodigdheden, samenvatting
   ========================================================================= */

/* 11 — Overzicht: de hele straat ----------------------------------------- */
const NODE_INFO = {
  inbox: ['Postvak IN (Outlook)', 'Aanvragen en antwoorden van klanten komen binnen in Outlook. De koppeling geeft elke nieuwe mail direct door aan de Lees-agent.'],
  a1: ['Lees-agent', 'Leest elke mail en zet klant, product en maten in het gedeelde dossier.'],
  a2: ['Aanvul-agent', 'Legt het dossier naast de checklist van het product, vult aan wat hij zelf kan vinden en bepaalt wat er ontbreekt.'],
  dec: ['Compleet?', 'Ontbreekt er iets, dan gaat de aanvraag rechtsom terug naar de klant. Is alles compleet, dan gaat hij door naar de Excel-agent.'],
  a3: ['Tone-of-voice-agent', 'Schrijft de klant in de stijl van ' + CFG.bedrijf.split(' ')[0] + ' en vraagt alleen wat echt nodig is.'],
  rcheck: [CFG.controleur + ' (optioneel)', CFG.controleur + ' kan de mail eerst controleren voordat hij de deur uitgaat. Staat dit uit, dan verstuurt de agent direct.'],
  a4: ['Verzend-agent', 'Verstuurt de mail via Outlook. Het antwoord van de klant komt later weer binnen in hetzelfde dossier.'],
  klant: ['Klant', 'Stuurt de aanvraag en beantwoordt eventuele vragen.'],
  a5: ['Excel-agent', 'Kiest de juiste map, vult het calculatiebestand in en stuurt het naar ' + CFG.controleur + '.'],
  richard: [CFG.controleur, 'Controleert de calculatie en vult aan wat vakkennis vraagt, zoals materiaal en prijs.'],
  offerte: ['Offerte', 'Na de controle van ' + CFG.controleur + ' kan de offerte naar de klant.']
};
Object.keys(NODE_INFO).forEach(k => EXTRA_CAPTIONS.push({ eyebrow: 'Overzicht · uitleg', title: NODE_INFO[k][0], text: NODE_INFO[k][1] + ' <span class="hint">Tik op ▶ om verder te spelen.</span>' }));

const MAP = (() => {
  const LX = 92, RX = 270;
  const N = {
    inbox: [LX, 30], a1: [LX, 90], a2: [LX, 150], dec: [LX, 214], a5: [LX, 280], richard: [LX, 340], offerte: [LX, 400],
    klant: [RX, 30], a4: [RX, 90], rcheck: [RX, 150], a3: [RX, 214]
  };
  const route = ['klant', 'inbox', 'a1', 'a2', 'dec', 'a3', 'rcheck', 'a4', 'klant', 'inbox', 'a1', 'a2', 'dec', 'a5', 'richard', 'offerte'];
  const plan = [];
  let t = 500;
  route.forEach((k, n) => {
    const dwell = n === 8 ? 1300 : n === route.length - 1 ? 2200 : 420;
    plan.push({ kind: 'dwell', k, n, t0: t, t1: t + dwell }); t += dwell;
    if (n < route.length - 1) {
      const a = N[k], b = N[route[n + 1]];
      const dur = Math.max(380, Math.hypot(b[0] - a[0], b[1] - a[1]) / .13);
      plan.push({ kind: 'move', from: k, to: route[n + 1], t0: t, t1: t + dur }); t += dur;
    }
  });
  return { N, plan, CYCLE: Math.round(t + 400) };
})();

SCENES.push({
  id: 'overzicht', menu: 'Overzicht: de hele straat',
  eyebrow: 'Overzicht',
  title: 'Zo werkt de hele straat',
  text: 'Ontbreekt er iets? Dan gaat de aanvraag rechtsom terug naar de klant. Is alles compleet? Dan gaat hij links door naar Excel en ' + CFG.controleur + '. <span class="hint">Tik op een stap voor uitleg.</span>',
  duration: MAP.CYCLE, station: null,
  build(L, tl) {
    const R = CFG.controleur, N = MAP.N, plan = MAP.plan, CYCLE = MAP.CYCLE;
    const label = {
      inbox: '<span class="tile tile--tool tile--sm">' + icon('mail') + '</span><span class="nl"><b>Postvak IN</b><small>Outlook</small></span>',
      offerte: '<span class="tile tile--tool tile--sm">' + icon('doc') + '</span><span class="nl"><b>Offerte</b><small>naar de klant</small></span>',
      rcheck: tile('richard', 'tile--sm') + '<span class="nl"><b>' + R + '</b><small>optioneel</small></span>'
    };
    ['a1', 'a2', 'a3', 'a4', 'a5', 'richard', 'klant'].forEach(k => {
      const a = AGENTS[k];
      label[k] = tile(k, 'tile--sm') + '<span class="nl"><b>' + (a.short || a.name) + '</b></span>';
    });
    const edges = [
      ['klant', 'inbox', 'M204 30H158'], ['inbox', 'a1', 'M92 48V72'], ['a1', 'a2', 'M92 108V132'], ['a2', 'dec', 'M92 168V191'],
      ['dec', 'a5', 'M92 237V262'], ['a5', 'richard', 'M92 298V322'], ['richard', 'offerte', 'M92 358V382'],
      ['dec', 'a3', 'M148 214H204'], ['a3', 'rcheck', 'M270 196V168'], ['rcheck', 'a4', 'M270 132V108'], ['a4', 'klant', 'M270 72V48']
    ];
    L.innerHTML =
      '<div class="sc sc-map">' +
        '<svg class="edges" viewBox="0 0 360 440" aria-hidden="true"><defs><marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0 1 9 5 0 9z"/></marker></defs>' +
          edges.map(e => '<path class="edge" data-e="' + e[0] + '-' + e[1] + '" d="' + e[2] + '" marker-end="url(#ah)"/>').join('') +
          '<text class="elabel" x="181" y="23" text-anchor="middle">mail</text>' +
          '<text class="elabel strong" x="176" y="206" text-anchor="middle">nee</text>' +
          '<text class="elabel strong" x="101" y="253">ja</text>' +
        '</svg>' +
        Object.keys(N).map(k => k === 'dec'
          ? '<button type="button" class="node node--dec" data-n="dec" style="left:' + N[k][0] + 'px;top:' + N[k][1] + 'px"><svg viewBox="0 0 112 46" aria-hidden="true"><polygon points="56,1.5 110.5,23 56,44.5 1.5,23"/></svg><span>Compleet?</span></button>'
          : '<button type="button" class="node' + (k === 'rcheck' ? ' opt' : '') + '" data-n="' + k + '" style="left:' + N[k][0] + 'px;top:' + N[k][1] + 'px">' + label[k] + '</button>'
        ).join('') +
        '<div class="dot-token" id="tok"></div>' +
        '<div class="map-status" id="mapStatus"></div>' +
      '</div>';

    const nodes = {};
    $$('.node', L).forEach(n => {
      nodes[n.dataset.n] = n;
      n.addEventListener('click', ev => {
        ev.stopPropagation();
        pause();
        $$('.node.sel', L).forEach(x => x.classList.remove('sel'));
        n.classList.add('sel');
        const info = NODE_INFO[n.dataset.n];
        E.override = true;
        caption(SCENES[E.i], { eyebrow: 'Overzicht · uitleg', title: info[0], text: info[1] + ' <span class="hint">Tik op ▶ om verder te spelen.</span>' });
      });
    });
    const edgeEl = {};
    $$('.edge', L).forEach(e => { edgeEl[e.dataset.e] = e; });

    const status = [[0, 'Ronde 1 · nieuwe aanvraag', ''], [4, 'Ronde 1 · er ontbreekt iets', 'miss'], [8, 'De klant antwoordt', ''], [12, 'Ronde 2 · compleet', 'ok'], [15, 'Klaar · offerte kan de deur uit', 'ok']];
    const MINI_OF = { klant: 'klant', inbox: 'klant', a1: 'a1', a2: 'a2', dec: 'a2', a3: 'a3', rcheck: 'richard', a4: 'a4', a5: 'a5', richard: 'richard', offerte: 'richard' };
    const tok = $('#tok', L), st = $('#mapStatus', L);
    let lastKey = '', lastEdge = '', lastStatus = -1, lastCycle = -1;
    tl.loop(time => {
      const cyc = Math.floor(time / CYCLE), c = time % CYCLE;
      if (cyc !== lastCycle) {
        lastCycle = cyc;
        $$('.edge', L).forEach(e => e.classList.remove('on'));
        nodes.dec.classList.remove('no', 'yes');
        lastStatus = -1;
      }
      const seg = plan.find(s => c >= s.t0 && c < s.t1);
      if (!seg) { tok.style.opacity = 0; return; }
      tok.style.opacity = 1;
      let x, y, key = '', edge = '';
      if (seg.kind === 'dwell') {
        [x, y] = N[seg.k]; key = seg.k;
        let si = 0;
        status.forEach((s, i) => { if (seg.n >= s[0]) si = i; });
        if (si !== lastStatus) {
          lastStatus = si;
          st.textContent = status[si][1];
          st.className = 'map-status in ' + status[si][2];
        }
        if (key === 'dec') { nodes.dec.classList.toggle('no', seg.n === 4); nodes.dec.classList.toggle('yes', seg.n === 12); }
      } else {
        const p = EASE.io((c - seg.t0) / (seg.t1 - seg.t0));
        const a = N[seg.from], b = N[seg.to];
        x = a[0] + (b[0] - a[0]) * p; y = a[1] + (b[1] - a[1]) * p;
        edge = seg.from + '-' + seg.to;
      }
      tok.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      if (key !== lastKey) {
        if (lastKey && nodes[lastKey]) nodes[lastKey].classList.remove('on');
        if (key && nodes[key]) { nodes[key].classList.add('on'); setMini(MINI_OF[key]); }
        lastKey = key;
      }
      if (edge !== lastEdge) {
        if (edge && edgeEl[edge]) edgeEl[edge].classList.add('on');
        lastEdge = edge;
      }
    });
  }
});

/* 12 — Benodigdheden ----------------------------------------------------- */
SCENES.push({
  id: 'nodig', menu: 'Wat is er nodig?',
  eyebrow: 'Benodigdheden',
  title: 'Wat is er nodig?',
  text: 'Drie bouwstenen: agents die met elkaar communiceren en koppelingen met Outlook en Excel. De koppelingen zijn bekend terrein; de volgende stap is verdiepen in de agents.',
  duration: 9500, station: null,
  build(L, tl) {
    L.innerHTML =
      '<div class="sc sc-bom">' +
        '<div class="conn">' +
          '<div class="cblock"><span class="tile tile--tool">' + icon('mail') + '</span><b>Outlook</b></div>' +
          '<span class="cwire" id="cw1"><i class="plug">' + icon('plug') + '</i></span>' +
          '<div class="cblock cblock--main"><span class="stack">' + ['a1', 'a2', 'a3', 'a4', 'a5'].map(k => tile(k, 'tile--sm')).join('') + '</span><b>Claude-agents</b></div>' +
          '<span class="cwire" id="cw2"><i class="plug">' + icon('plug') + '</i></span>' +
          '<div class="cblock"><span class="tile tile--tool">' + icon('sheet') + '</span><b>Excel</b></div>' +
        '</div>' +
        '<div class="bom">' +
          '<div class="bom-t">Stuklijst</div>' +
          '<div class="bom-r bom-h"><span>Pos.</span><span>Omschrijving</span><span>Status</span></div>' +
          '<div class="bom-r"><span class="mono">1</span><span>Claude-agents die met elkaar communiceren</span><span><i class="st-chip next pop">volgende stap</i></span></div>' +
          '<div class="bom-r"><span class="mono">2</span><span>Koppeling Claude ↔ Outlook</span><span><i class="st-chip ok pop">kennis aanwezig</i></span></div>' +
          '<div class="bom-r"><span class="mono">3</span><span>Koppeling Claude ↔ Excel</span><span><i class="st-chip ok pop">kennis aanwezig</i></span></div>' +
        '</div>' +
        '<div class="sticky pop bom-sticky">Even verdiepen in de Claude Agents, de koppeling kan ik al.</div>' +
      '</div>';
    tl.add(500, $('#cw1', L), 'on');
    tl.add(1200, $('#cw2', L), 'on');
    const chips = $$('.st-chip', L);
    tl.add(2200, chips[1], 'in');
    tl.add(2600, chips[2], 'in');
    tl.add(3200, chips[0], 'in');
    tl.add(4000, $('.bom-sticky', L), 'in');
  }
});

/* 13 — Samenvatting ------------------------------------------------------ */
SCENES.push({
  id: 'einde', menu: 'Samenvatting',
  eyebrow: 'Samenvatting',
  title: 'Minder handwerk, meer controle',
  text: 'De agents doen het uitzoek- en typwerk. ' + CFG.controleur + ' doet waar hij goed in is. Zo gaat elke aanvraag sneller en consistenter door de straat.',
  duration: 8000, station: 'all',
  build(L, tl) {
    const R = CFG.controleur;
    const res = [
      ['sheet', '', 'Geen overtypen', 'Gegevens gaan direct van de mail naar Excel.'],
      ['voice', '', 'Netjes nagevraagd', 'Mist er iets? Een agent vraagt het netjes na.'],
      ['person', ' tile--human', R + ' houdt de controle', 'De agents doen het voorwerk, hij de vakkennis.']
    ];
    L.innerHTML =
      '<div class="sc sc-end">' +
        res.map(r => '<div class="r3 rv"><span class="tile' + r[1] + '">' + icon(r[0]) + '</span><div><b>' + r[2] + '</b><span>' + r[3] + '</span></div></div>').join('') +
        '<div class="sticky pop end-sticky">Dit is dus de beste manier om het zo optimaal mogelijk te automatiseren.</div>' +
        '<div class="sblock rv">' +
          '<div class="sb-c"><span>Project</span><b>Offertestraat</b></div>' +
          '<div class="sb-c"><span>Versie</span><b>' + CFG.versie + '</b></div>' +
          '<div class="sb-c"><span>Blad</span><b class="mono">' + SCENES.length + '/' + SCENES.length + '</b></div>' +
          '<div class="sb-c wide"><span>Onderwerp</span><b>Claude-agents in het offerteproces</b></div>' +
          '<div class="sb-c"><span>Datum</span><b class="mono">' + CFG.datum + '</b></div>' +
        '</div>' +
        '<div class="end-btns rv"><button type="button" class="cbtn cbtn--main" id="again">' + icon('replay') + 'Opnieuw afspelen</button>' +
          '<button type="button" class="cbtn" id="toMap">' + icon('diagram') + 'Overzicht</button></div>' +
      '</div>';
    $('#again', L).addEventListener('click', () => go(1));
    $('#toMap', L).addEventListener('click', () => go(SCENES.findIndex(s => s.id === 'overzicht')));
    $$('.r3', L).forEach((r, n) => tl.add(300 + n * 450, r, 'in'));
    tl.add(1900, $('.end-sticky', L), 'in');
    tl.add(2500, $('.sblock', L), 'in');
    tl.add(3000, $('.end-btns', L), 'in');
  }
});

boot();

/* PWA: offline beschikbaar via de service worker (alleen op https of localhost) */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}

})();
