# Clearleaf — saved handoff, 28 October 2026

## User direction

The user disliked the first animated one-page design, small text, blurry images and artificial-looking illustrations. Current instruction: keep it simple and human, use the user's content and artwork, with three separate pages: **Home, Packaging and Events**. Avoid bringing back the quiz, mock cart, elaborate animations, invented botanical illustrations, tiny labels or overdecorated layouts.

## Saved implementation

- React + TypeScript + Vite, with real `index.html`, `packaging.html`, and `events.html` entries.
- Shared navigation and footer in `src/components.tsx`, page layouts in `src/main.tsx`, packaging data in `src/content.ts`, styling in `src/styles.css`.
- 18px body text, 20–21px introductory text, 16px minimum supporting text. System Arial body and Georgia headings. No external font loading.
- Original floral teacup replaces the invented animated version.
- Extracted original embedded image pixels from `/Users/blairfranciscus/Desktop/Marketing Group Assignment (3).pdf` into `public/images/original-teacup.png` (1192×1180), `original-sachets.png` (1924×242), `original-stall.png` (1536×1024), and `original-poster.png` (1024×1536). No generated replacements. Original screenshots remain preserved.
- Individual packaging designs use non-destructive SVG viewports over the higher-resolution original sachet strip.
- Original flower border in the footer. Straightforward factual copy. Proposed campus campaign, with dates unconfirmed.
- Important content discrepancy: campaign images use Berry Hibiscus and Night Study, while approved collection names are Berrylicious, Mint Study and Lemon Myrtle. Do not silently rename or modify artwork; campaign labels are marked as unconfirmed.

## GitHub Pages — retain this setup

User explicitly wants **Deploy from a branch → main → /docs**, not a custom Actions workflow.

`npm run build` checks TypeScript and generates tracked `docs/` with all three HTML pages and assets. Commit/push all generated changes and deletions alongside source changes. `.nojekyll` comes from `public/.nojekyll`.

Main live URL: https://blairfranciscus.github.io/ClearLeaf_ClearMind/

Do not give the old `/docs/` URL: when Pages publishes from `/docs`, that directory becomes the live root. Earlier blank-page issues came from publishing root development HTML, which points to raw TSX. The live main address was verified working in Chrome before this redesign.

## Verification completed

- `npm run build` passed after the higher-resolution original artwork was integrated.
- `npx playwright test --config playwright.pages.config.ts`: **5 passed**. These are updated tests for the simpler pages; old cart/quiz tests have been replaced.
- Checked true page navigation, direct reload and browser back; layouts at 1440px, 390px and 320px; no horizontal overflow; text sizes at least 16px; image requests and original poster link.
- Screenshots from those checks are in `/tmp/clearleaf-index-1440.png`, `/tmp/clearleaf-packaging-1440.png`, `/tmp/clearleaf-events-1440.png` and corresponding `390` versions. These temporary files may not survive a restart.
- Changes are saved locally. No remote commit/push or publication was performed by the assistant.

## Next session

1. Read this file and inspect `git status` to retain any newer user edits.
2. Visually inspect the screenshots (or regenerate) for any final layout refinements. Browser tests have already passed, but the final screenshots were not yet visually reviewed before the user needed to shut down.
3. Keep the three-page design simple. Do not expand scope without user direction.
4. Keep `README.md` accurate. If code changes, rebuild `docs/` before handing off for the user to push.

The user asked to save because the laptop battery died. Do not restart the design or repeat earlier GitHub setup troubleshooting without new evidence.
