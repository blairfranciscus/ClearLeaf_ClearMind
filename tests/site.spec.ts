import { test, expect } from "@playwright/test";
test("cart persists, quantities update, and items can be removed", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Add Berrylicious to bag", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Open shopping bag, 1 items" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Berrylicious" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Increase Berrylicious" }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "Open shopping bag, 2 items" })
    .click();
  await expect(page.getByLabel("Berrylicious quantity")).toHaveText("2");
  await page.getByRole("button", { name: "Decrease Berrylicious" }).click();
  await expect(page.getByLabel("Berrylicious quantity")).toHaveText("1");
  await page.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(page.getByText("Your bag is waiting to bloom.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("quiz completes and recommendation opens product details", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("button", { name: "Find your tea", exact: true })
    .click();
  await page.getByRole("button", { name: /A minty moment/ }).click();
  await page
    .getByRole("button", { name: /My favourite library corner/ })
    .click();
  await page.getByRole("button", { name: /Starting a fresh page/ }).click();
  await expect(
    page.getByRole("heading", { name: "Hello, Mint Study." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add my match to bag" }).click();
  await expect(
    page.getByRole("button", { name: "Open shopping bag, 1 items" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View tea details" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Mint Study", exact: true }),
  ).toBeVisible();
});
test("mobile navigation, images and layout work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Our teas" })
    .click();
  await expect(
    page.getByRole("button", { name: "Toggle navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.forEach((img) => ((img as HTMLImageElement).loading = "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete),
  );
  const broken = await page
    .locator("img")
    .evaluateAll(
      (imgs) =>
        imgs.filter(
          (img) =>
            !(img as HTMLImageElement).complete ||
            !(img as HTMLImageElement).naturalWidth,
        ).length,
    );
  expect(broken).toBe(0);
  await page.screenshot({ path: "/tmp/clearleaf-mobile.png", fullPage: true });
});
test("desktop has no horizontal overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.forEach((img) => ((img as HTMLImageElement).loading = "eager")),
    );
  await page.waitForFunction(() =>
    Array.from(document.images).every((i) => i.complete),
  );
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({ path: "/tmp/clearleaf-desktop.png", fullPage: true });
});
