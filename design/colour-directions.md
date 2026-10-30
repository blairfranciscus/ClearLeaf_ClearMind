# Palette directions — 30 October 2026

The user supplied two pink-and-green reference palettes and requested help choosing background, text and button colours. Preserve all drawing colours and the existing layout. The user has now requested the recommended palette be applied. It is implemented in `src/palette.css`; original values are commented there and the original `src/styles.css` is preserved. Comment out the palette import in `src/main.tsx` and rebuild to revert.

Recommended direction: the warm pink and green from Court-Side Chic, with a deeper related green for buttons and soft sage from Summer in Nantucket.

| Role                                                | Colour  |
| --------------------------------------------------- | ------- |
| Main background                                     | #FFE7E4 |
| Clearleaf wordmark and large green titles           | #3E8340 |
| Filled buttons, small green links and active labels | #356F38 |
| Body text                                           | #304730 |
| Cream panels                                        | #F7EFDA |
| Pale sage accents                                   | #DADEBB |

Calculated contrast: white on #356F38 is 6.03:1; #304730 on #FFE7E4 is 8.60:1. #3E8340 on #FFE7E4 is 3.93:1, so reserve it for large headings and the wordmark, not small regular text.

Alternative direction: #FFDFE0 background with #2E6A68 wordmark and #255956 buttons.

The preview shows the original artwork without blend modes. When applying a palette, keep illustrations on neutral paper and remove multiply blending where a background change would tint their colours. Do not recolour, filter, regenerate or modify the image assets.

## Revision after seeing the live pink background

The user prefers the original near-white #FFFAF6 for the main background. The previously proposed #FFE7E4 remains an accent only (small fills, borders and hover states). Garden-green lettering and deeper green buttons are retained. The comparison image above records the earlier full-pink proposal, not the current implementation.
