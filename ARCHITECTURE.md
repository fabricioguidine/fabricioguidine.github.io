# Architecture

This repository hosts a **single-page static personal site** published with
GitHub Pages, plus a **dev-time Node toolchain** that lints, audits, and
end-to-end tests the site. Nothing in the toolchain is deployed: GitHub Pages
serves the static files in the repository root verbatim (`.nojekyll` disables
the Jekyll build).

## 1. Published site

```
index.html              Single page. All sections live here:
                        Hero, About, Experience, Skills, Projects,
                        Education, Research, Contact.
assets/
  css/styles.css        Design tokens + component styles, dark mode,
                        reduced-motion, print stylesheet.
  js/lang.js            EN/PT-BR toggle (localStorage), footer year stamp.
  js/a11y.js            Accessibility preferences panel.
  img/avatar.jpg        Hero avatar (binary).
  cv/cv_fabricio_guidine_en.pdf   Downloadable CV (binary).
.nojekyll               Serve files as-is; no Jekyll processing.
```

The page is bilingual: every translatable node is tagged `data-lang-en` /
`data-lang-pt`, and `lang.js` shows one set at a time. Navigation is a set of
in-page anchors (`#about`, `#experience`, `#skills`, `#projects`,
`#education`, `#research`, `#contact`) — there are no separate HTML pages and
no client-side router. All assets are referenced with case-correct, relative
paths so the site resolves identically on case-sensitive (Linux) and
case-insensitive (macOS/Windows) filesystems.

## 2. Test & build tooling

The toolchain is plain Node, declared in `package.json` and pinned by
`package-lock.json`. There is no compile/bundle step for the site itself.

| File | Role |
| --- | --- |
| `package.json` | devDependencies + npm scripts |
| `package-lock.json` | Pinned dependency tree; `npm ci` installs from it |
| `playwright.config.js` | Playwright config: starts a local `http-server`, runs Chromium |
| `tests/e2e/home.spec.js` | End-to-end assertions for the homepage |
| `.html-validate.json` | html-validate ruleset (lenient, matches existing markup) |
| `.htmlhintrc` | HTMLHint ruleset |
| `.cspell.json` | Spell-check dictionary (EN + PT-BR + project terms) |
| `.pa11yci.json` | pa11y-ci accessibility config |
| `lighthouserc.json` | Lighthouse CI config |
| `.editorconfig` | Editor defaults (LF, UTF-8, 2-space) |
| `.gitattributes` | Normalize text to LF, mark binaries |

### npm scripts

| Script | What it does |
| --- | --- |
| `lint:html` | HTMLHint over `**/*.html` |
| `validate:html` | html-validate over `index.html` |
| `spell` | cspell over markdown/HTML/YAML |
| `a11y` | pa11y-ci (needs `serve` running) |
| `lhci` | Lighthouse CI |
| `serve` | `http-server` on port 4000 |
| `test:e2e` | Playwright e2e tests |
| `test` | html-validate + Playwright e2e (the default gate) |

### Playwright flow

`playwright.config.js` owns the local web server via the `webServer` option:
it runs `npx http-server . -p 8080 -c-1 -s`, waits for the port, and points
`baseURL` at it. `reuseExistingServer: false` guarantees a clean server per
run, and a 120 s startup timeout absorbs slow CI runners. Only Chromium is
configured. `tests/e2e/home.spec.js` asserts:

- the homepage responds `200` and the `<title>` is correct;
- the primary navigation renders with a link for every section;
- every key `<section>` (`about`…`contact`) exists;
- every in-page nav anchor resolves to an existing element (no dangling `#id`);
- every local stylesheet / script / image asset resolves (status `< 400`);
- the CV PDF link resolves;
- the page loads with **no console errors and no uncaught page errors**.

## 3. Continuous integration

`.github/workflows/ci.yml` runs on `push`/`pull_request` to `main`/`master`
and on `workflow_dispatch`, with `permissions: contents: read` and a
`cancel-in-progress` concurrency group.

- **Linux-only quality jobs:** `html-lint`, `spell-check`, `link-check`
  (lychee), `accessibility` (pa11y-ci), `lighthouse`. These rely on
  Linux-only actions/tools and run once on `ubuntu-latest`.
- **`e2e` job (cross-platform):** a `fail-fast: false` matrix over
  `ubuntu-latest`, `macos-latest`, and `windows-latest`. Each leg checks out,
  sets up Node 20 with npm cache, runs `npm ci`, installs Chromium
  (`--with-deps` on Linux, plain on macOS/Windows), runs `npm run test:e2e`,
  and uploads the Playwright HTML report as an artifact.

No deployment workflow lives here: GitHub Pages' built-in
`pages-build-deployment` publishes `main` directly. CI never touches the live
site.

## 4. Cross-platform guarantees

- `.gitattributes` enforces `* text=auto eol=lf`, so text files are stored and
  checked out as LF on Linux, macOS, and Windows. Binary types (images, PDF,
  fonts) are marked `binary` and never normalized.
- `.editorconfig` keeps editors aligned (LF, UTF-8, 2-space indent).
- Every npm script invokes Node binaries only, with no shell-specific
  operators or path separators, so the same commands run in bash, zsh, and
  PowerShell.
