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
