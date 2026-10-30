# Clearleaf

A six-page botanical tea concept website with a soft blush, cream and sage palette, gingham details and the user's original drawings. Built with React, TypeScript and Vite.

## Pages

- **Home** — tea introduction, the flower-filled cup and a preview of the collection.
- **About** — the brand story and the supplied line-drawn teacup sketch.
- **Our Products** — Berrylicious, Mint Study and Lemon Myrtle, with concept pack selection and Add to Cart.
- **My Cart** — persistent pack quantities, removal and concept totals. No payment, shipping or checkout.
- **Events** — proposed university campus programmes, the pop-up and original campaign poster.
- **Join Our Team** — influencer campaigns and brand ambassador participation. Application contact and campaign terms are marked as coming soon.

The old `packaging.html` address continues to display Our Products so existing links work.

## Run and edit

```sh
npm install
npm run dev
```

Content and page layouts are in `src/pages/`. Shared header, footer, links, sachet artwork and quantity controls are in `src/components.tsx`. Edit product names, proposed pack prices and navigation in `src/content.ts`. The cart is in `src/cart.tsx`; CSS is in `src/styles.css`.

Body text is 18px, with 16px minimum supporting text. The header uses regular links across pages, including on mobile. No quiz or complex animation is included.

## Cart and concept prices

Cart items use `clearleaf-cart-v2` in browser localStorage, keyed by flavour and pack. Quantities range from 1 to 99. Invalid storage is ignored. The UI reports when the browser cannot save the cart. Earlier cart data from the original single-page mock store is not imported because it did not identify pack sizes.

Proposed AUD prices come from the supplied report: 5-sachet Starter Pack $5.00 and 20-sachet Standard Pack $19.95. These are clearly labelled as concept prices, not live offers. No customer information or payments are collected.

## Artwork and brand facts

`public/images/` preserves the original screenshots and higher-resolution artwork extracted directly from the provided PDF. The sachet SVG viewports now use tightly framed transparent-background edit copies. The original source strip remains preserved. `teacup-sketch.png` is a copy of the supplied line-drawn cup and heart screenshot.

The campus campaign is proposed, with dates and flavour labels unconfirmed. Campus programmes refer to universities, as clarified by the user. Final product ingredients, allergens and serving amounts remain unconfirmed. Join Our Team refers to influencers and brand ambassadors, not general employment; no compensation, application availability or partnerships are invented.

## Build and publish from main

```sh
npm run build
```

This generates all page HTML files and assets in the tracked `docs/` folder. Commit and push **all source changes and the complete regenerated `docs/` folder**, including removed build files.

GitHub Pages setting: **Deploy from a branch → main → /docs**.

Live address: https://blairfranciscus.github.io/ClearLeaf_ClearMind/

Do not use `/docs/` in the live URL: GitHub publishes that folder's contents at the site root. Do not publish the root development HTML files as a website; they point to TypeScript source. No custom GitHub Actions deployment is needed.

## Browser checks

```sh
npm run build
npx playwright test --config playwright.pages.config.ts
```

Tests require Google Chrome. They exercise page navigation and reload, cart persistence and totals, malformed storage, the legacy packaging address, the campaign poster and layouts at 1440px, 390px and 320px. The production test server uses the repository path `/ClearLeaf_ClearMind/` to catch hosting path mistakes.

## Colours and reverting to the previous palette

The page background is the original near-white `#FFFAF6`. Light pink `#FFE7E4` is reserved for the slim banner, small badges, gingham details, selected panels, link borders and hover states. The palette keeps garden-green Clearleaf lettering `#3E8340`, deeper green buttons `#356F38`, cream panels `#F7EFDA` and pale sage accents `#DADEBB`. The overrides are in `src/palette.css`, with original values recorded in comments. `src/styles.css` is preserved unchanged.

To restore the previous look, comment out `import "./palette.css";` in `src/main.tsx`, run `npm run build`, then commit and push all updated `docs/` files. Drawing assets are untouched. The new palette displays the drawings without multiply blending so the surrounding pink does not tint their original colours.

## Teacup motion and link previews

The homepage's supplied teacup drawing gently floats by 10px over an eight-second cycle. Its pause/play control is beneath the illustration. Reduced-motion preferences disable the movement and hide the unnecessary control. Motion rules live separately in `src/motion.css`; the approved near-white and green palette remains unchanged.

Every HTML entry contains static Open Graph and Twitter Card metadata so preview crawlers do not need to run React. Canonical and image URLs target the existing GitHub Pages address. The shared preview is `public/social/clearleaf-share-v1.png` (1200×630). Teacup PNG/ICO favicons, an Apple touch icon and a minimal web manifest are in `public/` and copied to `docs/` during the build.

`node scripts/build-brand-assets.mjs` regenerates these derived assets using Google Chrome and the original drawing; it is a manual task and not required for ordinary production builds. The script renders the existing drawing without generative replacement, filters or recolouring. Keep the original image in `public/images/original-teacup.png` unchanged. If the share image changes in the future, give it a new versioned filename and update all HTML references.

References: [Open Graph protocol](https://ogp.me/), [Apple rich preview guidance](https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages). The nine browser checks include reduced-motion/pause behaviour, static metadata with JavaScript disabled, and icon/image responses at the repository URL path. Actual previews in messaging/social apps can be checked after the user pushes the rebuilt website.

## Transparent homepage artwork

The homepage cup uses `public/images/teacup-transparent-v1.png` (1268×1241). Shared sachet displays use `public/images/sachets-transparent-v1.png` (2171×724) through individually cropped SVG viewports. These are transparent-background copies created with the built-in image-editing tool. The original drawings, icon/share-card source and source files remain preserved. The cup still floats; sachets have a slightly smaller display width and padding inside their pastel cards.

Prompts, source files and output paths are recorded in `design/artwork-background-removal.md`. Cropping bounds in `src/content.ts` are measured around each individual wrapper, so neighbouring sachets cannot bleed into the cards.

## Image framing and footer garden

The original footer flowers now sit outside the content-width wrapper as the final full-width strip on every page. Their white paper background spans the screen. The drawing repeats horizontally at its natural proportions with a responsive 180–360px height, keeping the flowers readable on phones and avoiding stretching on wide screens. Footer text and navigation sit above the garden.

About and Join Our Team use matching white paper frames with pink borders for the original line-drawn cup, so the screenshot paper does not form an inset white box against a different-coloured backing. The campus photograph and campaign poster retain their full aspect ratios. Artwork source files are unchanged by this layout cleanup.

All eleven browser checks pass. The image audit checks loading, natural proportions and resolution, full-width flowers at the document bottom on all six pages at 320px, 390px and 1440px, and a separate 2560px-wide footer check.
