# Artwork background removal — 30 October 2026

Mode: built-in image_gen image editing, transparent_background=true. Original source files are preserved. New sibling assets are used for website displays; the prior icon/share-card exports remain based on the original source drawing.

## Cup

Source: `public/images/original-teacup.png`.

Saved edit: `public/images/teacup-transparent-v1.png` (1268×1241 RGBA).

Used on the homepage, with the existing float/pause animation and a slightly smaller 94% display width to leave breathing room inside the gingham frame.

Final prompt:

> Edit the supplied Clearleaf floral teacup image ONLY to remove its surrounding white paper background. This is precise background extraction of existing brand artwork, NOT a redesign. Keep the entire original teacup, handle, every flower, stem, leaf, outline, texture, handwritten Clearleaf word, colours, proportions and composition unchanged. Do not redraw, restyle, simplify, retouch or add anything. Preserve the original opaque WHITE CERAMIC CUP and its cream/grey shading; white inside the cup body must remain white, not become transparent. Only the paper outside the illustrated silhouettes and open holes such as the cup handle and spaces between stems should be transparent. Use smooth clean edges without a white rectangular halo. Crop the canvas close to the illustration with a small, even transparent margin, retaining all petals, leaves and cup edges. Return a single transparent-background PNG cutout of the same flower-filled cup.

## Sachets

Source: `public/images/original-sachets.png`.

Saved edit: `public/images/sachets-transparent-v1.png` (2171×724 RGBA).

Used by the shared Sachet component on Home, Our Products, My Cart and the legacy Packaging page. SVG viewports crop each wrapper individually, including an 8px transparent margin:

- Berrylicious: `8 279 716 176`.
- Mint Study: `732 279 692 176`.
- Lemon Myrtle: `1432 279 716 176`.

The three wrapper boundaries were measured from connected opaque regions, then verified visually to avoid neighbouring-wrapper bleed. The sachet maximum display width is 340px.

Final prompt:

> Edit the supplied image ONLY to extract the THREE existing Clearleaf tea sachets from their white paper background. This is exact brand-asset background removal, not a redesign. Keep the three sachets in a single horizontal row in their original order: pink Berrylicious on the left, blue Mint Study in the centre, yellow Lemon Myrtle on the right. Preserve EVERY original letter, handwritten typography, floral/berry/mint/lemon illustration, side Clearleaf words, crimped wrapper edge, outline, colour, highlight, shading, texture, shape and proportion unchanged. Product names must remain exactly Berrylicious, Mint Study and Lemon Myrtle, as already drawn. Do not redraw, invent, stylise or add any typography, objects, shadows or decorations. Remove ONLY the blank white outside each wrapper; pale and white details INSIDE each sachet remain opaque. All three wrappers must be fully visible, separate, not overlapping, with clean transparent gaps and no white rectangular strips or halo. Keep the alignment and relative sizes, with small transparent margins around the outermost objects. A wide canvas is appropriate; do not stretch the individual wrappers. Return a single transparent-background PNG containing the three original sachets.
