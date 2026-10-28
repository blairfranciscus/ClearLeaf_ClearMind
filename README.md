# Clearleaf

A simple three-page brand website: Home, Packaging and Events. Built with React, TypeScript and Vite, using the supplied brand artwork at sensible display sizes and readable typography.

## Saved progress

The three-page redesign is saved in the project. The animated hero, quiz and mock shopping cart have been removed in favour of the original branding and straightforward navigation. Body text is 18px, with larger headings and 16px minimum supporting text. Higher-resolution originals were extracted directly from the supplied PDF for the teacup, sachets, stall and poster. Packaging uses SVG viewports to display the original sachet strip without redrawing it.

The production build has been updated in `docs/`. Five browser checks pass against the production build beneath the GitHub repository path: page navigation, refresh and browser back, desktop and mobile layouts (1440px, 390px and 320px), readable text, image loading and the poster link.

## Edit and preview

- `index.html`, `packaging.html`, `events.html`: real page entry points.
- `src/main.tsx`: page layouts and factual copy from the supplied report.
- `src/components.tsx`: shared header, footer and page links.
- `src/content.ts`: packaging information and asset paths.
- `src/styles.css`: typography and responsive layouts.
- `public/images/`: original brand screenshots, preserved without generative alterations.

Run `npm run dev` to preview locally. Run `npm run build` after source changes; it regenerates all three pages and assets in `docs/`.

## GitHub Pages

Commit and push **all source changes and the complete regenerated `docs/` folder**, including removed build files. In Settings → Pages select **Deploy from a branch → main → /docs**.

Live address: https://blairfranciscus.github.io/ClearLeaf_ClearMind/

The old `/docs/` URL is not the live address when Pages publishes from that folder. GitHub serves its contents at the address above. The root `index.html` is the development entry; publish the built folder.

Clearleaf is a University of Sydney marketing concept. The campus event is proposed, with dates to be confirmed. Full product ingredients, allergens and serving information have not been finalised. The campaign poster and stall use some different flavour labels from the sachet collection; supplied artwork is preserved and final labels are marked as unconfirmed.
