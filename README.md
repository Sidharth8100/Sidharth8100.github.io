# Sidharth Bhagat — Portfolio

A responsive, static engineering portfolio. Built with HTML, CSS, and vanilla JavaScript; no package installation, framework runtime, API key, or build step.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. A web server is recommended for clipboard access and consistent browser behavior.

## GitHub Pages

The repository root is the deployable site. `index.html`, `styles.css`, `script.js`, `observatory.js`, `.nojekyll`, and `assets/` are all that serving the page requires. Keep GitHub Pages configured to deploy from the root of your chosen publishing branch, for example `redesign/engineering-observatory`. No SPA rewrite is needed: sections use ordinary hash anchors. Old `#/work`, `#/about`, and `#/skills` links are mapped to the corresponding new sections.

The current working branch is `redesign/engineering-observatory`. This update is committed locally; this session does not push or deploy. When ready, push this branch and select it under Settings → Pages → Deploy from a branch → /(root). Later pushes to that configured branch trigger deployment; local commits alone do not.

## Interactions

- Spring-driven systems sculpture: local dot repulsion, smoothed pointer tilt, and an outward particle burst that spans the viewport and carries visitors to the next good problem (Contact) by default. Journey, Work, Arena, and About remain selectable destinations. The launch label sits below the artwork. Click/tap or focus it and press Enter.
- Escape skips the flight to its destination. Pause and reduced-motion preferences use immediate navigation. Offscreen/background rendering stops automatically.
- Responsive project artwork with bounded tilt, pointer-following light, and direct case-study activation. Filters, disclosures, pathfinding, and architecture tracing give short visual feedback.
- WARDEN architecture inspector and illustrative event trace.
- Nine gallery projects plus featured WARDEN. Combined text/category search, a resettable empty state, and detailed native dialogs.
- Interactive architecture steps for Panel, EncryptiView, CIFAR-10, and this portfolio.
- A repository notebook distinguishes the Bitcoin research sketch and GitHub profile from implemented projects.
- Breadth-first-search playground: toggle walls, find a shortest path, reset even during playback. Arrow keys move between cells.
- Expandable experience and toolkit sections.
- Quick navigation using **Ctrl/Cmd + K**; type to search, Tab/Arrow Down to focus, Enter to open, Esc to close.
- Responsive navigation, local India time, email copy, resume download, reading progress.

Core profile, experience, achievements, contact details and resume remain available with JavaScript disabled; interactive project details have a GitHub/resume fallback. No analytics or external runtime requests are made.

## Files

- `index.html`: semantic page content and metadata
- `styles.css`: responsive visual design, print rules, reduced-motion styles
- `script.js`: project data, original SVG illustrations, core interaction logic
- `observatory.js`: particle physics, navigation transition lifecycle, reactive surfaces
- `assets/`: resume, avatar, favicon, share image
- `docs/CONTENT_SOURCES.md`: provenance, benchmark scope, conflict resolution
- `docs/VERIFICATION.md`: validation results and known limits
- `tests/`: browser smoke/regression checks

The old compiled app remains recoverable through Git history.

## Optional development checks

The website itself needs no Node packages. To run the retained browser tests, install Playwright 1.57 and axe-core 4.10 in your development environment:

```sh
npm install --no-save --package-lock=false playwright@1.57.0 axe-core@4.10.3
node tests/browser.cjs
node tests/accessibility.cjs
node tests/interactions.cjs
```

Start the preview server first. Tests use installed Google Chrome at `/usr/bin/google-chrome`; set `CHROME_PATH` for a different installation. `PORTFOLIO_PLAYWRIGHT` and `PORTFOLIO_AXE` can point to existing package installations instead of installing anything here. Screenshots and reports go into ignored `test-results/`.
