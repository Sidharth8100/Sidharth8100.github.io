# Sidharth Bhagat — Portfolio

A responsive, static engineering portfolio. Built with HTML, CSS, and vanilla JavaScript; no package installation, framework runtime, API key, or build step.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. A web server is recommended for clipboard access and consistent browser behavior.

## GitHub Pages

The repository root is the deployable site. `index.html`, `styles.css`, `script.js`, `.nojekyll`, and `assets/` are all that serving the page requires. Keep GitHub Pages configured to deploy from the root of the publishing branch (normally `main`). No SPA rewrite is needed: sections use ordinary hash anchors. Old `#/work`, `#/about`, and `#/skills` links are mapped to the corresponding new sections.

This redesign is committed locally on `redesign/engineering-observatory`. Nothing has been pushed or deployed. Review the branch and merge into your publishing branch when ready.

## Interactions

- Canvas systems sculpture with pointer response, pause control, reduced-motion support, and offscreen/background suspension.
- WARDEN architecture inspector and illustrative event trace.
- Project category filters and detailed, keyboard-accessible native dialogs.
- Breadth-first-search playground: toggle walls, find a shortest path, reset even during playback. Arrow keys move between cells.
- Expandable experience and toolkit sections.
- Quick navigation using **Ctrl/Cmd + K**; type to search, Tab/Arrow Down to focus, Enter to open, Esc to close.
- Responsive navigation, local India time, email copy, resume download, reading progress.

Core profile, experience, achievements, contact details and resume remain available with JavaScript disabled; interactive project details have a GitHub/resume fallback. No analytics or external runtime requests are made.

## Files

- `index.html`: semantic page content and metadata
- `styles.css`: responsive visual design, print rules, reduced-motion styles
- `script.js`: project data, original SVG illustrations, interaction logic
- `assets/`: resume, avatar, favicon, share image
- `docs/CONTENT_SOURCES.md`: provenance, benchmark scope, conflict resolution
- `docs/VERIFICATION.md`: validation results and known limits
- `tests/`: browser smoke/regression checks

The old compiled app remains recoverable through Git history.
