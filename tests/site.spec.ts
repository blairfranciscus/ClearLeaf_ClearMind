import { test, expect, type Page } from "@playwright/test";
const routes = [
  "index.html",
  "about.html",
  "products.html",
  "cart.html",
  "events.html",
  "join-our-team.html",
];
async function loadImages(page: Page) {
  await page.locator("img").evaluateAll((images) =>
    images.forEach((image) => {
      image.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    [...document.images].every((i) => i.complete),
  );
  // Decode the decorative background too; it is not a document.images entry.
  await page.locator(".footer-garden").evaluate(async (element) => {
    const url = getComputedStyle(element).backgroundImage.match(
      /url\(["']?(.*?)["']?\)/,
    )?.[1];
    if (!url) throw new Error("Footer flower image missing");
    const image = new Image();
    image.src = url;
    await image.decode();
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) => images.filter((i) => !i.naturalWidth).length),
  ).toBe(0);
}

test("all six pages have real navigation, direct reload and browser history", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  const nav = () => page.getByRole("navigation", { name: "Main navigation" });
  for (const [name, file] of [
    ["About", "about.html"],
    ["Our Products", "products.html"],
    ["Events", "events.html"],
    ["Join Our Team", "join-our-team.html"],
  ]) {
    await nav().getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${file.replace(".", "\\.")}$`));
    await page.reload();
    await expect(
      nav().getByRole("link", { name, exact: true }),
    ).toHaveAttribute("aria-current", "page");
  }
  await page
    .getByRole("link", { name: /My Cart/ })
    .first()
    .click();
  await expect(page).toHaveURL(/cart\.html$/);
  await page.goBack();
  await expect(page).toHaveURL(/join-our-team\.html$/);
  expect(errors).toEqual([]);
});

test("cart supports two pack sizes, correct totals, refresh and removal", async ({
  page,
}) => {
  await page.goto("./products.html");
  const berry = page.getByRole("article", {
    name: "Berrylicious",
    exact: true,
  });
  await berry.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("status", { name: "Cart update" })).toContainText(
    "Berrylicious added",
  );
  await berry.getByLabel("Choose your pack").selectOption("standard");
  await berry.getByRole("button", { name: "Increase Berrylicious" }).click();
  await berry.getByRole("button", { name: "Add to cart" }).click();
  await page.locator(".cart-link").click();
  await expect(page.getByText("$44.90", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("$44.90", { exact: true })).toBeVisible();
  const standard = page.getByRole("article", {
    name: "Berrylicious Standard pack",
    exact: true,
  });
  await standard
    .getByRole("button", { name: "Decrease Berrylicious Standard pack" })
    .click();
  await expect(page.getByText("$24.95", { exact: true })).toBeVisible();
  await standard
    .getByRole("button", { name: "Remove Berrylicious Standard pack" })
    .click();
  await expect(
    page.getByRole("article", {
      name: "Berrylicious Standard pack",
      exact: true,
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Empty my cart" }).click();
  await expect(
    page.getByRole("heading", { name: "Your cart is waiting for tea." }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".cart-count")).toHaveText("0");
});

test("corrupt saved cart does not crash and invalid products are ignored", async ({
  page,
}) => {
  await page.goto("./");
  await page.evaluate(() => localStorage.setItem("clearleaf-cart-v2", "oops"));
  await page.goto("./cart.html");
  await expect(
    page.getByRole("heading", { name: "Your cart is waiting for tea." }),
  ).toBeVisible();
  await page.evaluate(() =>
    localStorage.setItem(
      "clearleaf-cart-v2",
      JSON.stringify([
        { teaId: "unknown", packId: "starter", quantity: 2 },
        { teaId: "mint", packId: "starter", quantity: -3 },
        { teaId: "lemon", packId: "starter", quantity: 1 },
      ]),
    ),
  );
  await page.reload();
  await expect(page.locator(".cart-count")).toHaveText("1");
  await expect(
    page.getByRole("article", { name: "Lemon Myrtle Starter pack" }),
  ).toBeVisible();
});

for (const width of [1440, 390, 320])
  test(`pages, fonts and artwork work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const failed: string[] = [];
    const errors: string[] = [];
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(r.url());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    for (const file of routes) {
      await page.goto(`./${file}`);
      await loadImages(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const imageProblems = await page.locator("img").evaluateAll((images) =>
        images
          .filter((image) => {
            const naturalRatio = image.naturalWidth / image.naturalHeight;
            const displayedRatio = image.clientWidth / image.clientHeight;
            return (
              image.clientWidth > image.naturalWidth + 1 ||
              Math.abs(displayedRatio / naturalRatio - 1) > 0.02
            );
          })
          .map((image) => image.getAttribute("src")),
      );
      expect(imageProblems).toEqual([]);
      const garden = await page.locator(".footer-garden").boundingBox();
      expect(garden).not.toBeNull();
      expect(Math.abs(garden!.x)).toBeLessThan(1);
      expect(Math.abs(garden!.width - width)).toBeLessThan(1);
      const pageHeight = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      expect(Math.abs(garden!.y + garden!.height - pageHeight)).toBeLessThan(2);
      const tiny = await page
        .locator("p,a,button,select,dt,dd,figcaption")
        .evaluateAll((elements) =>
          elements
            .filter(
              (e) =>
                !e.closest(".sr-only") &&
                getComputedStyle(e).display !== "none" &&
                parseFloat(getComputedStyle(e).fontSize) < 16,
            )
            .map((e) => e.textContent),
        );
      expect(tiny).toEqual([]);
      if (width !== 320)
        await page.screenshot({
          path: `/tmp/clearleaf-redesign-${file.replace(".html", "")}-${width}.png`,
          fullPage: true,
        });
    }
    expect(failed).toEqual([]);
    expect(errors).toEqual([]);
  });

test("campus programme, influencer opportunities and legacy packaging link work", async ({
  page,
}) => {
  await page.goto("./events.html");
  await expect(
    page.getByRole("heading", { name: "More than a stand." }),
  ).toBeVisible();
  const poster = page.getByRole("link", { name: "See the original poster" });
  const href = await poster.getAttribute("href");
  const response = await page.request.get(new URL(href!, page.url()).href);
  expect(response.status()).toBe(200);
  await page.goto("./join-our-team.html");
  await page.getByRole("link", { name: "Find your place" }).click();
  await expect(page.locator("#opportunities")).toBeInViewport();
  await expect(
    page.getByText("For influencers & creators", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("For brand ambassadors", { exact: true }),
  ).toBeVisible();
  await page.goto("./packaging.html");
  await expect(
    page.getByRole("heading", { name: "Berrylicious", exact: true }),
  ).toBeVisible();
});

test("teacup floats, can be paused and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  const cup = page.locator("#homepage-teacup");
  await expect(cup).toBeVisible();
  expect(await cup.evaluate((el) => getComputedStyle(el).animationName)).toBe(
    "clearleaf-teacup-float",
  );
  await page
    .getByRole("button", { name: "Pause teacup animation", exact: true })
    .click();
  await cup.evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((animation) => animation.ready));
  });
  expect(
    await cup.evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  const pausedTransform = await cup.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await page.waitForTimeout(180);
  expect(await cup.evaluate((el) => getComputedStyle(el).transform)).toBe(
    pausedTransform,
  );
  await page
    .getByRole("button", { name: "Play teacup animation", exact: true })
    .click();
  expect(
    await cup.evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await cup.evaluate((el) => getComputedStyle(el).animationName)).toBe(
    "none",
  );
  await expect(
    page.getByRole("button", { name: "Pause teacup animation", exact: true }),
  ).toBeHidden();
});

test("share metadata and teacup icons work without JavaScript on every page", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  try {
    const page = await context.newPage();
    const expected =
      "https://blairfranciscus.github.io/ClearLeaf_ClearMind/social/clearleaf-share-v1.png";
    for (const file of [...routes, "packaging.html"]) {
      await page.goto(`./${file}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        expected,
      );
      await expect(
        page.locator('meta[property="og:image:width"]'),
      ).toHaveAttribute("content", "1200");
      await expect(
        page.locator('meta[property="og:image:height"]'),
      ).toHaveAttribute("content", "630");
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        expected,
      );
      const icon = await page
        .locator('link[rel="icon"][sizes="32x32"]')
        .getAttribute("href");
      expect(new URL(icon!, page.url()).pathname).toBe(
        "/ClearLeaf_ClearMind/favicon-32.png",
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        await page.title(),
      );
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toMatch(
        /^https:\/\/blairfranciscus\.github\.io\/ClearLeaf_ClearMind\//,
      );
    }
    for (const [file, width, height] of [
      ["favicon-32.png", 32, 32],
      ["favicon-48.png", 48, 48],
      ["apple-touch-icon.png", 180, 180],
      ["favicon-192.png", 192, 192],
      ["favicon-512.png", 512, 512],
      ["social/clearleaf-share-v1.png", 1200, 630],
    ] as const) {
      const response = await context.request.get(new URL(file, baseURL).href);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      const data = await response.body();
      expect(data.subarray(1, 4).toString()).toBe("PNG");
      expect(data.readUInt32BE(16)).toBe(width);
      expect(data.readUInt32BE(20)).toBe(height);
    }
    const ico = await context.request.get(new URL("favicon.ico", baseURL).href);
    expect(ico.status()).toBe(200);
    const manifestResponse = await context.request.get(
      new URL("site.webmanifest", baseURL).href,
    );
    expect(manifestResponse.status()).toBe(200);
    const manifest = await manifestResponse.json();
    expect(manifest.icons).toHaveLength(2);
  } finally {
    await context.close();
  }
});

test("homepage artwork uses transparent cutouts without white rectangular corners", async ({
  page,
}) => {
  await page.goto("./");
  await loadImages(page);
  await expect(page.locator("#homepage-teacup img")).toHaveAttribute(
    "src",
    /teacup-transparent-v1\.png$/,
  );
  await expect(page.locator(".tea-trio .sachet-artwork image")).toHaveCount(3);
  const results = await page.evaluate(async () => {
    const paths = [
      document.querySelector("#homepage-teacup img").getAttribute("src"),
      document
        .querySelector(".tea-trio .sachet-artwork image")
        .getAttribute("href"),
    ];
    return Promise.all(
      paths.map(async (src) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const sample = (x, y) => [...ctx.getImageData(x, y, 1, 1).data];
        return {
          src,
          corners: [
            [0, 0],
            [img.naturalWidth - 1, 0],
            [0, img.naturalHeight - 1],
            [img.naturalWidth - 1, img.naturalHeight - 1],
          ].map(([x, y]) => sample(x, y)[3]),
          centre: sample(
            Math.floor(img.naturalWidth * 0.5),
            Math.floor(img.naturalHeight * 0.8),
          ),
        };
      }),
    );
  });
  for (const result of results) expect(result.corners).toEqual([0, 0, 0, 0]);
  // Keep the white ceramic cup opaque; do not globally key out white pixels.
  expect(results[0].centre[3]).toBeGreaterThanOrEqual(250);
});

test("footer flowers span a wide screen without stretching or horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 2560, height: 1200 });
  await page.goto("./");
  await loadImages(page);
  const garden = await page.locator(".footer-garden").boundingBox();
  expect(garden!.x).toBe(0);
  expect(garden!.width).toBe(2560);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    2560,
  );
  expect(garden!.height).toBeLessThanOrEqual(360);
  await page
    .locator(".site-footer")
    .screenshot({ path: "/tmp/clearleaf-footer-wide.png" });
});
