import { test, expect } from "@playwright/test";

const routes = [
  "index.html",
  "about.html",
  "products.html",
  "cart.html",
  "events.html",
  "join-our-team.html",
  "packaging.html",
];

for (const viewport of [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 844, height: 390 },
]) {
  test(`all pages fit mobile viewport ${viewport.width}×${viewport.height}, including a full cart`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("./");
    await page.evaluate(() =>
      localStorage.setItem(
        "clearleaf-cart-v2",
        JSON.stringify(
          ["berry", "mint", "lemon"].flatMap((teaId) =>
            ["starter", "standard"].map((packId) => ({
              teaId,
              packId,
              quantity: 99,
            })),
          ),
        ),
      ),
    );
    for (const route of routes) {
      await page.goto(`./${route}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll("main *, header *, footer *")]
          .filter((el) => {
            if (el.closest("svg, .sr-only")) return false;
            const box = el.getBoundingClientRect();
            return (
              box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
            );
          })
          .map((el) => `${el.tagName}.${el.className}`),
      );
      expect(overflow, route).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route,
      ).toBe(viewport.width);
    }
  });
}

for (const width of [320, 390, 820]) {
  test(`touch navigation and cart work at ${width}px and after rotation`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      baseURL,
      viewport: { width, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
      reducedMotion: "no-preference",
    });
    try {
      const page = await context.newPage();
      await page.goto("./");
      await page.getByRole("button", { name: "Pause teacup animation" }).tap();
      await expect(
        page.getByRole("button", { name: "Play teacup animation" }),
      ).toBeVisible();
      const nav = page.getByRole("navigation", { name: "Main navigation" });
      for (const name of ["About", "Events", "Join Our Team", "Our Products"]) {
        await nav.getByRole("link", { name, exact: true }).tap();
        await expect(
          nav.getByRole("link", { name, exact: true }),
        ).toHaveAttribute("aria-current", "page");
      }
      const berry = page.getByRole("article", {
        name: "Berrylicious",
        exact: true,
      });
      await berry.getByLabel("Choose your pack").selectOption("standard");
      await berry
        .getByRole("button", { name: "Increase Berrylicious", exact: true })
        .tap();
      await berry.locator("summary").tap();
      await expect(berry.locator("details")).toHaveAttribute("open", "");
      await berry
        .getByRole("button", { name: "Add to cart", exact: true })
        .tap();
      const notice = page.getByRole("status", { name: "Cart update" });
      await expect(notice).toContainText("Berrylicious added");
      const toastBox = await notice.boundingBox();
      expect(toastBox!.x).toBeGreaterThanOrEqual(0);
      expect(toastBox!.x + toastBox!.width).toBeLessThanOrEqual(width);
      await notice.getByRole("link", { name: "View cart" }).tap();
      await expect(
        page.getByText("$39.90", { exact: true }).last(),
      ).toBeVisible();
      await page.reload();
      await expect(page.locator(".cart-count")).toHaveText("2");
      await page.setViewportSize({ width: 844, height: width });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(844);
      await page.setViewportSize({ width, height: 844 });
      const smallTargets = await page
        .locator(
          "button, select, summary, .site-header nav a, .cart-link, .footer-content nav a",
        )
        .evaluateAll((elements) =>
          elements
            .filter((el) => {
              const box = el.getBoundingClientRect();
              return box.width > 0 && (box.height < 44 || box.width < 44);
            })
            .map((el) => el.outerHTML),
        );
      expect(smallTargets).toEqual([]);
      await page
        .getByRole("button", {
          name: "Decrease Berrylicious Standard pack",
          exact: true,
        })
        .tap();
      await expect(
        page.getByText("$19.95", { exact: true }).last(),
      ).toBeVisible();
      const garden = page.locator(".footer-garden");
      await garden.scrollIntoViewIfNeeded();
      await expect(garden).toHaveAttribute("data-reveal-state", "revealed");
      await expect
        .poll(() =>
          garden.evaluate(
            (el) =>
              new DOMMatrix(getComputedStyle(el, "::after").transform).m22,
          ),
        )
        .toBe(0);
      await page.screenshot({
        path: `/tmp/clearleaf-mobile-cart-${width}.png`,
        fullPage: true,
      });
      await page
        .getByRole("button", {
          name: "Remove Berrylicious Standard pack",
          exact: true,
        })
        .tap();
      await expect(
        page.getByRole("heading", { name: "Your cart is waiting for tea." }),
      ).toBeVisible();
      await page
        .getByRole("navigation", { name: "Footer navigation" })
        .getByRole("link", { name: "Home", exact: true })
        .tap();
      await expect(page.locator("#homepage-teacup")).toBeVisible();
    } finally {
      await context.close();
    }
  });
}
