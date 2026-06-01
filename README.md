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

The published site is plain static files. The Node toolchain in this repo is **dev-time only** (linting, accessibility, Lighthouse, and Playwright e2e) — it is never deployed. See [ARCHITECTURE.md](ARCHITECTURE.md) for the full layout.

## Layout

```
.
├── index.html                 # single-page site, all sections
├── assets/
│   ├── css/styles.css         # design tokens + components
│   ├── js/lang.js             # EN/PT toggle, year stamp
│   ├── js/a11y.js             # accessibility preferences panel
│   ├── img/avatar.jpg         # hero avatar
│   └── cv/                    # downloadable CV PDF
├── tests/e2e/                 # Playwright end-to-end tests
├── playwright.config.js       # Playwright config (serves site, Chromium)
├── .github/
│   ├── workflows/ci.yml       # CI: lint, a11y, spellcheck, lighthouse, links, e2e matrix
│   └── dependabot.yml         # weekly npm + github-actions updates
├── .nojekyll                  # skip Jekyll build
├── package.json               # dev tooling (linters, a11y, lighthouse, Playwright)
├── package-lock.json          # pinned dependency tree (used by `npm ci`)
└── README.md
```

## Tooling

Every PR runs the following on GitHub Actions:

| Check | Tool | OS |
| --- | --- | --- |
| HTML lint (source) | [HTMLHint](https://htmlhint.com/) | Linux |
| HTML validation | [html-validate](https://html-validate.org/) | Linux |
| Spell check (EN + PT-BR) | [cspell](https://cspell.org/) with `@cspell/dict-pt-br` | Linux |
| Broken links | [lychee](https://github.com/lycheeverse/lychee-action) | Linux |
| Accessibility (WCAG 2 AA) | [pa11y-ci](https://github.com/pa11y/pa11y-ci) | Linux |
| Performance / SEO / a11y scores | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Linux |
| End-to-end (homepage, nav, links, assets, console) | [Playwright](https://playwright.dev/) | Linux · macOS · Windows |
| Dependency updates | Dependabot (npm + github-actions) | — |

The Playwright job runs on a **Linux / macOS / Windows matrix** so the dev/test
tooling is verified to work identically on all three. Node behaves the same on
every OS, and `.gitattributes` normalizes line endings to LF so checkouts are
byte-identical across platforms.

## Local development & testing

The toolchain is pure Node and runs the same on every OS. Install dependencies
once with `npm ci` (uses the committed lockfile), then install the Chromium
browser Playwright drives.

### Linux / macOS

```bash
npm ci
npx playwright install chromium      # one-time browser download
npm test                             # html-validate + Playwright e2e

# individual checks
npm run lint:html                    # HTMLHint
npm run validate:html                # html-validate
npm run spell                        # cspell (EN + PT-BR)
npm run serve                        # http-server on :4000
npm run a11y                         # pa11y-ci against :4000
npm run lhci                         # Lighthouse CI
npm run test:e2e                     # Playwright only
```

### Windows (PowerShell)

```powershell
npm ci
npx playwright install chromium      # one-time browser download
npm test                             # html-validate + Playwright e2e

# individual checks
npm run lint:html
npm run validate:html
npm run spell
npm run serve
npm run test:e2e
```

> **Cross-platform note:** the npm scripts and Playwright's `webServer` use only
> Node binaries (`http-server`, `html-validate`, `playwright`) and avoid
> shell-specific syntax, so the exact same commands work in bash, zsh, and
> PowerShell. No `&&`-chained shell scripts, no hardcoded path separators.

### Quick preview (no Node)

```bash
python -m http.server 8080
# open http://localhost:8080
```

## License

[MIT](LICENSE) © 2026 Fabrício de Sousa Guidine
