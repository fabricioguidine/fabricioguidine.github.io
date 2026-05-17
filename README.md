# 👋 Hi, I'm Fabrício Guidine

[![CI](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![pages-build-deployment](https://github.com/fabricioguidine/fabricioguidine.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://fabricioguidine.github.io)

**Software Development Engineer in Test (SDET)**
🔧 QA Automation | Python | Selenium | Appium | Cypress

- 💼 [LinkedIn](https://linkedin.com/in/fabricioguidine)
- 🧪 [GitHub Projects](https://github.com/fabricioguidine?tab=repositories)

> "Quality is never an accident; it is always the result of intelligent effort."

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=fabricioguidine&show_icons=true&theme=default)

## Local development

```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

## Tooling

This site ships with best-in-class CI checks that run on every PR:

| Check | Tool |
| --- | --- |
| Jekyll build | `bundle exec jekyll build --strict_front_matter` |
| HTML lint (source) | [HTMLHint](https://htmlhint.com/) |
| HTML validation (built) | [html-validate](https://html-validate.org/) |
| Spell check (EN + PT-BR) | [cspell](https://cspell.org/) |
| Broken links | [lychee](https://github.com/lycheeverse/lychee-action) |
| Accessibility (WCAG 2 AA) | [pa11y-ci](https://github.com/pa11y/pa11y-ci) |
| Performance / SEO / a11y scores | [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) |
| Dependency updates | Dependabot (bundler, npm, github-actions) |

Run any of the linters locally:

```bash
npm install
npm run lint:html
npm run spell
npm run a11y      # requires the site running on :4000
npm run lhci      # requires a built _site/
```

## License

[MIT](LICENSE) (c) 2026 fabricioguidine
