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

`public/images/` preserves the original screenshots and higher-resolution artwork extracted directly from the provided PDF. The sachet SVG viewports display the original strip without redrawing it. `teacup-sketch.png` is a copy of the supplied line-drawn cup and heart screenshot.

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
