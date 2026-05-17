# fabricioguidine.github.io

Personal website for **Fabrício de Sousa Guidine** — Sr. QA Engineer / SDET.

Live: <https://fabricioguidine.github.io>

## Stack

- Static HTML + CSS (no build step)
- `.nojekyll` flag — GitHub Pages serves the files as-is
- Bilingual EN / PT-BR via a tiny vanilla-JS toggle (`assets/js/lang.js`)
- Dark mode via `prefers-color-scheme`, reduced-motion respected, WCAG-AA contrast
- Skip-link + semantic landmarks for keyboard / screen-reader navigation
- Schema.org `Person` JSON-LD for search engines

## Layout

```
.
├── index.html          # single-page site, all sections
├── assets/
│   ├── css/styles.css  # design tokens + components
│   ├── js/lang.js      # EN/PT toggle, year stamp
│   └── cv/             # downloadable CV PDF
├── .nojekyll           # skip Jekyll build
└── README.md
```

## Local preview

Any static server works. From the repo root:

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Deploy

Pushes to `main` are served by GitHub Pages automatically.
