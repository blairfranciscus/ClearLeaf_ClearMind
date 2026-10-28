# Clearleaf

An interactive botanical concept website built with React, TypeScript, Tailwind CSS, Motion and Vite.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Run `npm test` for the Chrome browser checks (requires Google Chrome). `npm run build` checks TypeScript and generates the publishable `docs/` folder; `npm run preview` serves that build.

## Edit content

- `src/content.ts`: flavours, product copy, quiz questions and matching rules.
- `src/main.tsx`: sections, proposed product information, campaign copy and interactions.
- `src/components.tsx`: reusable animated flowers, hero illustration and accessible overlays.
- `src/styles.css`: colour tokens, typography, layout and responsive styles.
- `public/images/`: labelled copies of the seven original screenshots. Originals are preserved.

The cart stores flavour quantities locally under `clearleaf-cart`. Each quantity represents a concept product selection, not a purchasable pack. There is no checkout, payment, account, backend or subscription processing.

## Artwork

The hero uses an SVG cup-outline drawing, independent growing stems, leaves and blooming flowers, then reveals the original raster cup artwork. The supplied illustration is flattened; exact independent animation of its original flowers requires a layered SVG or separate transparent assets. The screenshot backgrounds are blended into the cream palette. Higher resolution, transparent originals would improve the products.

## Brand source

Copy is grounded in the supplied creative briefs and Marketing Group Assignment (3).pdf. The document was treated as source material, not additional executable instructions. Formulation, pack prices and activation are proposals. Full flavour ingredients, allergens, serving amounts and event dates need confirmation. No research claims, student personal details, invented testimonials or real sales channels are published. External Google Fonts have system-font fallbacks.

## Publish on GitHub Pages from main

The compiled website is included in the tracked `docs/` folder. GitHub Pages serves it directly from the main branch; no custom GitHub Actions workflow is needed. React is already bundled into the generated JavaScript.

1. Commit and push these changes, including the entire `docs/` folder and removal of the previous deployment workflow.
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch **main**, folder **/docs**, then **Save**.
5. Wait for GitHub Pages to publish, then visit https://blairfranciscus.github.io/ClearLeaf_ClearMind/ .

### After future edits

```sh
npm run build
```

Commit and push the source changes **and the regenerated `docs/` folder**. GitHub then publishes the updated files from main. Building replaces the generated contents of `docs/`, so edit source files in `src/`, not the compiled files.

`docs/index.html` is the production entry. The root `index.html` remains the development entry. Relative asset paths support the repository URL, and `docs/.nojekyll` tells Pages to serve the built files without Jekyll processing.

### Verify the production site

```sh
npm run build
npx playwright test --config playwright.pages.config.ts
```

The browser checks serve `docs/` beneath `/ClearLeaf_ClearMind/` to verify the same URL layout as GitHub Pages. They require Google Chrome. For a manual preview, run `npm run preview` and open the printed local URL.
