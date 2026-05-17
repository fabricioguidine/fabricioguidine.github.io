# fabricioguidine.github.io

[![CI](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml)
[![pages-build-deployment](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://fabricioguidine.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal website for **Fabrício de Sousa Guidine** — Sr. QA Engineer / SDET.

Live: <https://fabricioguidine.github.io>

## Stack

- Static HTML + CSS (no build step)
- `.nojekyll` flag — GitHub Pages serves files as-is
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
├── .github/workflows/  # CI: lint, a11y, spellcheck, lighthouse
├── .nojekyll           # skip Jekyll build
└── README.md
```

## Local preview

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Tooling

Every PR runs the following checks on GitHub Actions:

| Check | Tool |
| --- | --- |
| HTML lint (source) | [HTMLHint](https://htmlhint.com/) |
| HTML validation | [html-validate](https://html-validate.org/) |
| Spell check (EN + PT-BR) | [cspell](https://cspell.org/) |
| Broken links | [lychee](https://github.com/lycheeverse/lychee-action) |
| Accessibility (WCAG 2 AA) | [pa11y-ci](https://github.com/pa11y/pa11y-ci) |
| Performance / SEO / a11y scores | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) |
| Dependency updates | Dependabot (npm + github-actions) |

Run any linter locally:

```bash
npm install
npm run lint:html        # HTMLHint
npm run validate:html    # html-validate
npm run spell            # cspell
npm run a11y             # needs the site running on :4000
npm run lhci             # Lighthouse CI against repo root
```

## License

[MIT](LICENSE) © 2026 Fabrício de Sousa Guidine
