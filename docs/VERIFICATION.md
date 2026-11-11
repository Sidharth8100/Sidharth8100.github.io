# Verification — November 11, 2026

## Passed

- JavaScript syntax validation and `git diff --check`.
- Isolated Google Chrome / Playwright browser regression suite (`tests/browser.cjs`).
- Seven viewport widths: 1440, 1024, 768, 760, 390, 375, and 320 pixels; no document horizontal overflow.
- All four project filters and all eight project detail dialogs.
- WARDEN node selection and event trace completion.
- BFS default fixture: shortest route of 18 edges; unreachable map; reset; arrow-key cell navigation.
- Reset during animated search cancels pending rendering without stale highlights.
- Ctrl/Cmd+K palette search, Enter selection, empty results, and Escape handling.
- Reduced-motion default, manual motion toggle, expandable experience rows.
- Clipboard success with browser permission; source includes an explicit manual-copy fallback when unavailable.
- All local HTML asset references, resume download, and social preview return HTTP 200.
- Old `#/work` route normalizes to `#work`, including same-document navigation.
- JavaScript-disabled core content and project fallback remain visible.
- No browser page errors or failed resource responses in the regression run.
- axe-core 4.10.3: zero violations for the WCAG 2 A/AA and 2.1 AA rule tags on desktop, mobile, the project dialog, and the navigation dialog.
- Visual inspection: desktop hero and page composition, about section/avatar, arena, 390px hero/playground/dialog, and 1200×630 social preview.
- Source formatted with Prettier; no production dependencies added.

## Verification scope

These checks used local headless Google Chrome. They do not constitute manual screen-reader, Safari, or Firefox certification. The app's visible-browser preview host was unavailable. Screenshots and automated browser checks were performed in an isolated local browser instead.

External profile URLs are drawn from the supplied resume, existing site, and public GitHub sources; third-party pages were not exhaustively availability-tested. LeetCode/CodeChef achievements are dated resume snapshots, not live API statistics. The LeetCode profile URL comes from the public GitHub README, and no CodeChef handle was guessed.

No deployment or remote mutation was performed. GitHub Pages compatibility is structural and locally tested: the repository root is a static site, with relative assets, no server APIs, no build step, no external fonts, and no rewrite requirement. Pushing/deployment remains with the owner.
