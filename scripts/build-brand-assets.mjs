// Export the existing Clearleaf logo into browser icons and a share card.
// The original artwork is rendered as supplied; no image generation or recolouring.
// Run manually with: node scripts/build-brand-assets.mjs (requires Google Chrome).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
const project = fileURLToPath(new URL("../", import.meta.url));
const original = await readFile(`${project}public/images/original-teacup.png`);
const dataUrl = `data:image/png;base64,${original.toString("base64")}`;
await mkdir(`${project}public/social`, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const icons = await page.evaluate(async (url) => {
    const image = new Image();
    image.src = url;
    await image.decode();
    return [32, 48, 180, 192, 512].map((size) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);
      const scale = Math.min(
        size / image.naturalWidth,
        size / image.naturalHeight,
      );
      const width = image.naturalWidth * scale,
        height = image.naturalHeight * scale;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(
        image,
        (size - width) / 2,
        (size - height) / 2,
        width,
        height,
      );
      return { size, png: canvas.toDataURL("image/png").split(",")[1] };
    });
  }, dataUrl);
  for (const icon of icons) {
    const filename =
      icon.size === 180 ? "apple-touch-icon.png" : `favicon-${icon.size}.png`;
    await writeFile(
      `${project}public/${filename}`,
      Buffer.from(icon.png, "base64"),
    );
  }
  const icoImages = icons.filter((icon) => [32, 48].includes(icon.size));
  const header = Buffer.alloc(6 + icoImages.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icoImages.length, 4);
  let offset = header.length;
  const buffers = [];
  icoImages.forEach((icon, index) => {
    const buffer = Buffer.from(icon.png, "base64");
    const entry = 6 + index * 16;
    header[entry] = icon.size;
    header[entry + 1] = icon.size;
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(buffer.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += buffer.length;
    buffers.push(buffer);
  });
  await writeFile(
    `${project}public/favicon.ico`,
    Buffer.concat([header, ...buffers]),
  );
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}body{background:#fffaf6;color:#304730;font-family:Arial,sans-serif;border-top:14px solid #ffe7e4}
  main{height:616px;display:grid;grid-template-columns:1fr 480px;gap:36px;align-items:center;padding:35px 62px}
  .brand{font-family:Georgia,serif;font-size:53px;font-style:italic;color:#3e8340;letter-spacing:-2px;margin:0 0 40px}
  h1{font-family:Georgia,serif;font-size:72px;line-height:1.05;font-weight:400;letter-spacing:-2px;margin:0 0 25px}em{font-weight:400;color:#3e8340}
  p{font-size:24px;line-height:1.5;margin:0;max-width:28ch}.line{display:block;background:#ffe7e4;width:80px;height:4px;margin-top:30px}
  .paper{background:#fff;border:1px solid #efdcda;padding:9px;transform:rotate(-2deg);border-radius:5px}img{display:block;width:100%;height:auto}
  </style></head><body><main><div><p class="brand">clearleaf</p><h1>Clear Mind,<br><em>Clearleaf.</em></h1><p>Tea for the chapters, the catch-ups and the time in between.</p><span class="line"></span></div><div class="paper"><img src="${dataUrl}" alt="Clearleaf floral teacup"></div></main></body></html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({
    path: `${project}public/social/clearleaf-share-v1.png`,
  });
  console.log(
    "Saved teacup favicons, Apple touch icon and 1200×630 share preview.",
  );
} finally {
  await browser.close();
}
