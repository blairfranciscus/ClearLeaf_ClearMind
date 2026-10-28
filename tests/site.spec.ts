import { test, expect, type Page } from "@playwright/test";

async function loadArtwork(page: Page) {
  await page.locator("img").evaluateAll((images) =>
    images.forEach((image) => {
      image.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );
  expect(
    await page
      .locator("img")
      .evaluateAll(
        (images) => images.filter((image) => !image.naturalWidth).length,
      ),
  ).toBe(0);
}

test("real page navigation works, including direct refresh and browser back", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(page).toHaveTitle("Clearleaf — Clear Mind, Clearleaf.");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Packaging", exact: true })
    .click();
  await expect(page).toHaveURL(/\/packaging\.html$/);
  await expect(
    page.getByRole("heading", { name: "Berrylicious", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Packaging" }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Events", exact: true })
    .click();
  await expect(page).toHaveURL(/\/events\.html$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Clearleafon campus.",
  );
  await page.reload();
  await expect(
    page.getByText("Exam season. Dates to be confirmed."),
  ).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/packaging\.html$/);
  expect(errors).toEqual([]);
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 320, height: 750 },
]) {
  test(`all pages render with readable text and no overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const failed: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failed.push(response.url());
    });
    for (const file of ["index.html", "packaging.html", "events.html"]) {
      await page.goto(`./${file}`);
      await loadArtwork(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const smallText = await page
        .locator("p, a, dt, dd, figcaption")
        .evaluateAll((elements) =>
          elements
            .filter(
              (element) => parseFloat(getComputedStyle(element).fontSize) < 16,
            )
            .map((element) => element.textContent),
        );
      expect(smallText).toEqual([]);
      if (viewport.width !== 320)
        await page.screenshot({
          path: `/tmp/clearleaf-${file.replace(".html", "")}-${viewport.width}.png`,
          fullPage: true,
        });
    }
    expect(failed).toEqual([]);
  });
}

test("original sachets and poster link load at the repository path", async ({
  page,
}) => {
  await page.goto("./packaging.html");
  await expect(
    page.getByRole("img", {
      name: "Original Berrylicious Clearleaf sachet design",
      exact: true,
    }),
  ).toBeVisible();
  expect(await page.locator(".sachet-artwork image").count()).toBe(3);
  await page.goto("./events.html");
  const poster = page.getByRole("link", { name: "Open the poster" });
  const href = await poster.getAttribute("href");
  const response = await page.request.get(new URL(href!, page.url()).href);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
});
