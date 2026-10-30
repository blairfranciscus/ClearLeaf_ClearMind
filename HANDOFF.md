# Clearleaf — saved handoff, 30 October 2026

## Current user direction

This replaces the earlier three-page brief. The user now wants six pages: **Home, About, Our Products, My Cart, Events, and Join Our Team**. They want a simple, cutesy, Pinterest-inspired feminine design using their uploaded drawings, while keeping text readable and artwork sharp. The old single-page elaborate animated garden and quiz should not return.

Explicit clarifications this session:
- Events programmes are for **university campuses**, not primary/secondary schools.
- Join Our Team is for **influencers joining campaigns and becoming brand ambassadors**, not general jobs.
- Application email/form was not provided. It is clearly marked as coming soon; no fake application submission.
- My Cart is explicitly requested again, superseding the old instruction to remove the cart.

## Implementation saved

- React + TypeScript + Vite multipage build.
- Real entries: `index.html`, `about.html`, `products.html`, `cart.html`, `events.html`, `join-our-team.html`.
- Legacy `packaging.html` remains functional and shows Our Products.
- Page components in `src/pages/`; shared header/footer/links/sachet viewports/quantity controls in `src/components.tsx`.
- Cart provider in `src/cart.tsx`; names, proposed pack data and navigation in `src/content.ts`.
- Cream, blush pink, sage, gingham detail, original floral drawings, simple serif headings and 18px body text. Minimum supporting text 16px. No external font downloads, no elaborate animation or quiz.
- Original flower-filled cup on Home. Uploaded cup-and-heart line drawing on About and Join Our Team, copied to `public/images/teacup-sketch.png`.
- Higher-resolution artwork extracted from the PDF is preserved in `public/images/original-teacup.png`, `original-sachets.png`, `original-stall.png`, `original-poster.png`. Original screenshots remain untouched.
- Original sachet strip is displayed through SVG viewports rather than redrawing or generating replacement packaging.
- Products support pack selection, quantities and Add to Cart. Proposed prices come from the supplied marketing report: 5 sachets $5.00 AUD, 20 sachets $19.95 AUD. Clearly labelled as concept prices. No real checkout/payment/shipping/accounts.
- Cart stored under `clearleaf-cart-v2`; validates stored data, handles malformed storage, merges duplicates and caps quantities at 99. Header count updates. Real page navigation preserves it through localStorage.
- University Events covers the proposed USyd sampling pop-up, campus ambassador programme and campaign content. Dates remain unconfirmed.
- Influencer/ambassador page explains the proposed campaign roles. Application contact and terms are marked as coming soon.
- Product names remain Berrylicious, Mint Study and Lemon Myrtle. Campaign artwork has different labels in places; its final labels and schedule are identified as illustrative/unconfirmed.

## GitHub Pages — keep the user’s chosen setup

**Deploy from a branch → main → /docs**. No custom Actions deployment.

`npm run build` checks TypeScript and regenerates all production pages/assets in tracked `docs/`. Commit/push all source and generated changes, including deletion of old hashed assets. `.nojekyll` comes from `public/.nojekyll`.

Live root: https://blairfranciscus.github.io/ClearLeaf_ClearMind/

Do not give `/docs/` as a live URL. Publishing from that folder maps its contents to the root. Earlier blank pages came from publishing development HTML instead of compiled docs.

Changes in this session are local. The assistant has not committed, pushed or deployed them. Preserve user changes such as the pre-existing `.DS_Store` modification.

## Verification completed

- `npm run build`: passed for final implementation.
- `npx playwright test --config playwright.pages.config.ts`: **7 passed** on final build.
- Covers all six pages and true navigation/reload/back, both pack sizes, cart subtotal/quantity/removal/persistence, malformed saved storage, legacy Packaging URL, original poster URL, university programme and influencer/ambassador content.
- All six pages checked at 1440px, 390px and 320px. No horizontal overflow, failed image requests or JavaScript errors. Supporting text at least 16px.
- Desktop and mobile screenshots saved temporarily in `/tmp/clearleaf-redesign-{index,about,products,cart,events,join-our-team}-{1440,390}.png`.
- Visually reviewed Home desktop, Products mobile and Join Our Team desktop; coherent original artwork, gingham/pastel styling and readable layouts.
- An initial browser-test permission review timed out. A permitted retry succeeded. No remaining permission blocker.

## Next session

Read this note and `git status` first. Continue within the current six-page direction, keep GitHub deployment configuration, use any new uploaded drawings and incorporate user feedback. Add real ambassador contact details only when supplied. If changing implementation, rebuild `docs/` before the user pushes. Do not repeat the old deployment troubleshooting without new evidence.
