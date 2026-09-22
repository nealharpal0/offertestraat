# De offertestraat

Een animatie van het stappenplan (concept 1): hoe Claude-agents samen een offerteaanvraag afhandelen, van de eerste mail tot een ingevulde calculatie voor Richard.

**Bekijken:** https://nealharpal0.github.io/offertestraat/

De animatie bestaat uit 13 stappen van samen ruim 2 minuten:

1. Introductie
2. Het team: vijf agents en één gedeeld dossier
3. Er komt een aanvraag binnen (Outlook)
4. Lees-agent: mails lezen
5. Aanvul-agent: controleren en aanvullen
6. Tone-of-voice-agent: mail opstellen
7. Verzend-agent: mail versturen (optioneel eerst langs Richard)
8. De klant antwoordt
9. Excel-agent: calculatie invullen
10. Richard controleert en vult aan
11. Overzicht van de hele straat (tik op een stap voor uitleg)
12. Wat is er nodig?
13. Samenvatting

## Wat zit er in deze repo

| Bestand | Waarvoor |
|---|---|
| `src/index.html` | De opbouw van de pagina. |
| `src/style.css` | De vormgeving. |
| `src/app.js` | De animatie zelf, inclusief de namen en voorbeeldgegevens (`CFG`). |
| `src/manifest.webmanifest` | Zorgt dat je telefoon de pagina als app herkent (naam, icoon, kleuren). |
| `src/sw.js` | Service worker: na de eerste keer openen werkt de app ook zonder internet. |
| `src/icons/favicon.svg` | Het app-icoon. Bij het bouwen worden hier de PNG-iconen voor iPhone, Android en de browser van gemaakt. |
| `src/LICENSE-fonts.txt` | Licentie van de gebruikte lettertypen (SIL Open Font License). |
| `tools/build.py` | Zet alles samen tot de site in `_site/`. |
| `tools/fonts.json` | Welke lettertypen en tekens in de pagina komen. |
| `.github/workflows/pages.yml` | Bouwt en publiceert de site automatisch bij elke wijziging. |

## Hoe het online komt

Bij elke wijziging op de branch `main` bouwt GitHub Actions de site en zet hem op GitHub Pages. Het bouwen doet dit:

- `style.css` en `app.js` gaan terug in `index.html`, zodat de pagina één zelfstandig bestand is;
- de lettertypen (Big Shoulders, Instrument Sans, DM Mono, Nothing You Could Do) worden uit de officiële Google Fonts-bestanden gehaald, beperkt tot de tekens die de pagina gebruikt, en in `index.html` gezet;
- de PNG-iconen worden gemaakt uit `favicon.svg`.

Het resultaat laadt niets van andere websites: alles, ook de lettertypen, zit in de gepubliceerde `index.html`.

Eenmalig nodig: **Settings → Pages → Source: GitHub Actions**.

Zelf bouwen op je computer:

```
pip install fonttools brotli cairosvg
python tools/build.py
```

De site staat dan in `_site/`.

## Als app op je telefoon

**iPhone:** open de link in **Safari** → tik op **Deel** (vierkantje met pijl omhoog) → **Zet op beginscherm** → **Voeg toe**.

**Android:** open de link in **Chrome** → tik op **⋮** → **App installeren** (of **Toevoegen aan startscherm**).

Daarna open je de offertestraat vanaf je beginscherm, schermvullend en zonder adresbalk. Na de eerste keer openen werkt hij ook zonder internet. Het scherm blijft aan zolang de animatie speelt.

## Bediening

| Actie | Hoe |
|---|---|
| Volgende of vorige stap | **›** en **‹**, of vegen over de animatie |
| Pauzeren en verder spelen | de middelste knop |
| Automatisch doorspelen aan of uit | de knop met de twee pijlen. Uit: elke stap wacht tot je op **›** tikt. Handig tijdens een presentatie. |
| Naar een stap springen | **Stappen**, of tik op de maatlijn bovenin |
| Uitleg bij een onderdeel | tik in het overzicht (stap 11) op een blok |
| Toetsenbord | pijltjestoetsen en spatiebalk |

## Aanpassen

De namen en voorbeeldgegevens staan bovenaan `src/app.js`, in het blok `const CFG`. Daar pas je bijvoorbeeld de bedrijfsnaam, de naam van de controleur (Richard), de voorbeeldklant of de datum aan. Sla de wijziging op in `main`; binnen een paar minuten staat de nieuwe versie online.

Wijzig je het icoon (`favicon.svg`) of het manifest? Verhoog dan ook in `src/sw.js` het versienummer (`offertestraat-v1` → `offertestraat-v2`), zodat telefoons de nieuwe bestanden ophalen.

Gebruik je nieuwe tekens die nog niet in de lettertypen zitten (bijvoorbeeld een ander symbool)? Voeg ze dan toe aan `unicodes` in `tools/fonts.json`.

## Goed om te weten

- GitHub Pages is openbaar: iedereen met de link kan de animatie bekijken. De klant en alle gegevens in het voorbeeld zijn verzonnen; wel staan de bedrijfsnaam (Kemeling) en de voornaam van de controleur erin.
