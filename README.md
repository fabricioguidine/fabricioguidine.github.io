# fabricioguidine.github.io

Personal site for Fabrício de Sousa Guidine, served via GitHub Pages. It is a single-page, bilingual (EN/PT-BR) static site built with plain HTML, CSS, and a small amount of vanilla JavaScript — no framework and no build step.

[![CI](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Live at <https://fabricioguidine.github.io>.

## Features

- **Bilingual EN/PT-BR** — every translatable element carries `data-lang-en` / `data-lang-pt`; `assets/js/lang.js` flips the `lang` attribute on `<html>` and CSS reveals the matching variant, with no page reload. The choice is detected from the browser and remembered in `localStorage`.
- **Single-page layout** — Hero, About, Experience, Skills, Projects, Education & Certifications, Research, and Contact sections.
- **Accessibility toolbar** (`assets/js/a11y.js`) — adjustable text size, high contrast, reduced motion, and link underlines, all persisted to `localStorage`.
- **Responsive and dark-mode aware** — dark mode via `prefers-color-scheme`, skip-link and semantic landmarks, and a print-friendly stylesheet.
- **SEO** — Schema.org `Person` JSON-LD embedded for search engines.

## Local preview

No build is needed — any static file server works:

```bash
python -m http.server 8080
# open http://localhost:8080
```

Or use the dev tooling in `package.json`:

```bash
npm install
npm run serve   # http-server on :4000
```

## Deployment

Published with GitHub Pages directly from the `main` branch. A `.nojekyll` file disables the Jekyll build so files are served exactly as committed. Every push and pull request runs the CI workflow (`.github/workflows/ci.yml`): HTMLHint, html-validate, cspell (EN + PT-BR), lychee link checking, pa11y-ci accessibility checks, and Lighthouse CI.

## Project structure

```
.
├── index.html                 # single-page site, all sections
├── assets/
│   ├── css/styles.css         # design tokens + components
│   ├── js/lang.js             # EN/PT toggle, year stamp, copy-email
│   ├── js/a11y.js             # accessibility toolbar
│   ├── img/avatar.jpg         # hero avatar
│   └── cv/                    # downloadable CV PDF
├── .github/
│   ├── workflows/ci.yml       # CI: lint, a11y, spellcheck, lighthouse, links
│   └── dependabot.yml         # weekly npm + github-actions updates
├── .nojekyll                  # skip Jekyll build
├── package.json               # dev tooling (linters, a11y, lighthouse)
└── README.md
```

## License

[MIT](LICENSE)
