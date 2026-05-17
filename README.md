# fabricioguidine.github.io

[![CI](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml)
[![pages-build-deployment](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://fabricioguidine.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Personal site for **Fabrício de Sousa Guidine** — Senior QA Engineer / SDET, based in São Paulo, Brazil.

🌐 Live: <https://fabricioguidine.github.io>
📄 CV (EN): [`assets/cv/cv_fabricio_guidine_en.pdf`](assets/cv/cv_fabricio_guidine_en.pdf)
🎓 Lattes: <https://lattes.cnpq.br/6036616213881137>
💼 LinkedIn: <https://www.linkedin.com/in/fabricioguidine>

## Sections on the site

| # | Section | What's there |
|---|---|---|
| 1 | **Hero** | Name, role, avatar, CV download, LinkedIn / GitHub / Lattes / Email buttons |
| 2 | **About** | Short bio (EN + PT-BR); current focus on AI-powered QA & test automation |
| 3 | **Experience** | Equifax (Sr. QA, 2025–) · PagBank (Intern → Sr. QA, 2020–2025) · FADEPE (Jr. Analyst, 2018–2019) |
| 4 | **Skills** | 6 cards: Languages, Test Automation, API & Performance, DevOps & Cloud, AI/LLMs for QA, Test Management |
| 5 | **Projects** | 8 selected repos from [github.com/fabricioguidine](https://github.com/fabricioguidine?tab=repositories) |
| 6 | **Education & Certifications** | BSc Information Systems (UFJF) · PGCC graduate courses · ISTQB CTFL + CPRE-FL |
| 7 | **Research** | Public Lattes CV + undergrad research highlights |
| 8 | **Contact** | Email, LinkedIn, GitHub, Lattes |

Top-right **PT** button swaps the entire page between English and Portuguese (preference is remembered via `localStorage`).

## Stack

- Static HTML + CSS, no build step
- `.nojekyll` flag — GitHub Pages serves files as-is
- Bilingual EN / PT-BR via a tiny vanilla-JS toggle (`assets/js/lang.js`, ~1 KB)
- Dark mode via `prefers-color-scheme`, reduced-motion respected, WCAG 2 AA contrast
- Skip-link + semantic landmarks for keyboard / screen-reader navigation
- Schema.org `Person` JSON-LD for search engines
- Print-friendly stylesheet

## Layout

```
.
├── index.html                 # single-page site, all sections
├── assets/
│   ├── css/styles.css         # design tokens + components
│   ├── js/lang.js             # EN/PT toggle, year stamp
│   ├── img/avatar.png         # hero avatar
│   └── cv/                    # downloadable CV PDF
├── .github/
│   ├── workflows/ci.yml       # CI: lint, a11y, spellcheck, lighthouse, links
│   └── dependabot.yml         # weekly npm + github-actions updates
├── .nojekyll                  # skip Jekyll build
├── package.json               # dev tooling (linters, a11y, lighthouse)
└── README.md
```

## Local preview

No build needed — any static server works:

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Tooling

Every PR runs the following on GitHub Actions:

| Check | Tool |
| --- | --- |
| HTML lint (source) | [HTMLHint](https://htmlhint.com/) |
| HTML validation | [html-validate](https://html-validate.org/) |
| Spell check (EN + PT-BR) | [cspell](https://cspell.org/) with `@cspell/dict-pt-br` |
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
npm run serve            # http-server on :4000 (needed for a11y)
npm run a11y             # pa11y-ci against :4000
npm run lhci             # Lighthouse CI against repo root
```

## License

[MIT](LICENSE) © 2026 Fabrício de Sousa Guidine
