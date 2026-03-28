# 1006 Westmount Drive — Formal Presentation

A scrolling web presentation for the March 30, 2026 meeting with Port Moody's Mayor, City Manager, and GM of Community Development.

## Project Structure

```
westmount-site/
├── index.html              ← Dev version (loads sections dynamically)
├── build.sh                ← Compiles everything into one deliverable file
├── css/
│   └── styles.css          ← All styles
├── js/
│   └── main.js             ← GSAP animations, nav, counters
├── sections/               ← Each section is its own file
│   ├── 00-nav.html         ← Progress bar, sidenav, mobile nav
│   ├── 01-hero.html        ← Opening "1006 Westmount Drive" screen
│   ├── 02-stakes.html      ← "If resolved / If not resolved" split
│   ├── 03-stats.html       ← 5 years / 4 apps / $250K / 0 permits
│   ├── 04-part1-banner.html
│   ├── 05-history.html     ← Timeline + comparison table
│   ├── 06-ditch-band.html  ← Full-bleed ditch paradox callout
│   ├── 07-site.html        ← Grade stats, SVG diagram, SSMUH callout
│   ├── 08-record.html      ← Staff quotes (verbatim transcripts)
│   ├── 09-contradictions.html ← 3 contradiction pairs
│   ├── 10-double-standard.html ← 932 vs 1006 comparison + map
│   ├── 11-disclosure.html  ← Non-disclosure timeline
│   ├── 12-rebuttals.html   ← Pre-emptive responses to staff arguments
│   ├── 13-part2-banner.html
│   ├── 14-housing-demand.html ← 3,063 / 9,796 / 1,694 data
│   ├── 15-seniors.html     ← Seniors homelessness data
│   ├── 16-province.html    ← Bill 44 / Bill 25 compliance table
│   ├── 17-chilling.html    ← Chilling effect + compound burden
│   ├── 18-demands.html     ← 5 formal requirements
│   ├── 19-escalation.html  ← 3 escalation paths
│   └── 20-closing-footer.html ← Summary + footer
├── images/                 ← Drop photos here (see below)
│   └── (empty — add your photos)
└── build/
    └── westmount-final.html ← Generated deliverable (after build)
```

## Quick Start

### Preview during development
You need a local server because the dev version uses `fetch()` to load sections:

```bash
# Python (simplest)
python3 -m http.server 8000

# Then open http://localhost:8000
```

### Build the final deliverable
```bash
bash build.sh
# → build/westmount-final.html (single self-contained file)
```

Open `build/westmount-final.html` directly in any browser — no server needed.

## Editing Sections

Each file in `sections/` is a standalone HTML fragment. Edit any section independently:

- **Add a photo**: Put the image in `images/`, then add `<img src="images/yourphoto.jpg" style="width:100%; display:block; margin:2rem 0;">` in the relevant section file
- **Remove a section**: Delete the file from `sections/` (the build script auto-includes all `*.html` files alphabetically)
- **Reorder sections**: Rename the number prefix (e.g., rename `08-record.html` to `06b-record.html` to move it earlier)
- **Add a new section**: Create a new file like `07b-new-section.html` — it'll slot in between 07 and 08

## Adding Photos

1. Save photos to the `images/` folder
2. In the relevant section file, add:
   ```html
   <img src="images/house-exterior.jpg"
        alt="1006 Westmount Drive exterior"
        style="width:100%; display:block; border:1px solid #D0CCC4; margin:2rem 0;">
   ```
3. For the build version, photos need to be base64-encoded or hosted. The build script currently references `images/` — if deploying as a single file, either:
   - Host images separately and use full URLs
   - Or base64-encode them inline (for small images)

## Key Files to Edit First

| What you want to do | File to edit |
|---|---|
| Change the hero text | `sections/01-hero.html` |
| Edit the staff quotes | `sections/08-record.html` |
| Update the 5 demands | `sections/18-demands.html` |
| Add photos to double standard | `sections/10-double-standard.html` |
| Change colors/fonts | `css/styles.css` (variables at top) |
| Adjust animations | `js/main.js` |

## Deployment Options

- **Projector meeting**: Open `build/westmount-final.html` in Chrome, F11 for fullscreen
- **Email as leave-behind**: Send `build/westmount-final.html` as an attachment
- **GitHub Pages**: Push this repo, enable Pages on main branch — it serves `index.html` automatically (but needs the server for section loading; alternatively just serve the build file)
- **Print**: Open in Chrome → Print → Save as PDF (print styles are included)

## External Dependencies

- Google Fonts: Raleway + Cormorant Garamond (loaded from CDN)
- GSAP 3.12.5 + ScrollTrigger (loaded from cdnjs CDN)
- No other dependencies. No npm. No frameworks.
