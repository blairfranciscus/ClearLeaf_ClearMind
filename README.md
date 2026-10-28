# Clearleaf

An interactive botanical concept website built with React, TypeScript, Tailwind CSS, Motion and Vite.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. Run `npm test` for the Chrome browser checks (requires Google Chrome). `npm run build` checks TypeScript and generates `dist/`; `npm run preview` serves that build.

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

## Publish on GitHub Pages

The included `.github/workflows/deploy-pages.yml` installs dependencies, builds the app, and publishes `dist/` whenever you push to `main`. React is bundled in the build; neither you nor visitors need to install it separately.

1. Commit and push the project, including `.github/workflows/deploy-pages.yml` and `package-lock.json`.
2. Open the repository's **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions** (not “Deploy from a branch”).
3. In **Actions**, open **Deploy Clearleaf to GitHub Pages**. If it hasn't run, choose **Run workflow** on `main`.
4. Wait for the build and deploy jobs to turn green, then open the URL shown by the deployment.

For this repository the expected URL is https://blairfranciscus.github.io/ClearLeaf_ClearMind/ . GitHub's deployment result is the source of truth. Future pushes update the same website automatically.

The workflow gets the correct base path from GitHub Pages, including custom domains. Product images and the SVG hero image use Vite's base URL, so they work beneath the repository path. Do not publish the raw source `index.html` directly; it is the development entry, and the built `dist/index.html` is the deployable page.

To test a build for the repository path locally:

```sh
npm run build -- --base /ClearLeaf_ClearMind/
npm run preview
```

Open the printed preview address with `/ClearLeaf_ClearMind/` appended.
