import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  // Never allow automated tests to send real messages.
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 200, body: "OK" }),
  );
});

test("new portfolio renders without errors or horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Ideas into real things." }),
  ).toBeVisible();
  await expect(page.locator('[data-scene-state="ready"]')).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Selected work" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("project filters and keyboard-accessible case study work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Websites", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Websites", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  const opener = page.getByRole("button", { name: "Explore JoulHub" });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Visit live site/ }),
  ).toHaveAttribute("href", "https://joulhub.com");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("motion can be paused and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(
    page.getByRole("button", { name: "Resume animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Reduced motion enabled" }),
  ).toBeDisabled();
});

test("WebGL unavailable keeps the portfolio usable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.includes("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto("/");
  await expect(page.locator('[data-scene-state="fallback"]')).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Ideas into real things." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore JoulHub" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("contact validates and reports successful delivery", async ({ page }) => {
  let payload;
  await page.route("https://api.emailjs.com/**", (route) => {
    payload = route.request().postDataJSON();
    return route.fulfill({ status: 200, body: "OK" });
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Test visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("Your project")
    .fill("An automated test. Delivery is intercepted.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(payload.template_params).toEqual({
    name: "Test visitor",
    email: "visitor@example.com",
    message: "An automated test. Delivery is intercepted.",
  });
  await expect(page.getByLabel("Your name")).toBeEmpty();
});

test("paused sculpture stays still and responds to keyboard and drag", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(
    page.getByRole("button", { name: "Resume animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  const canvas = page.locator(".sculpture-canvas");
  await page.mouse.move(0, 0);
  await canvas.focus();
  const before = await canvas.screenshot({ animations: "disabled" });
  await page.waitForTimeout(150);
  expect(
    before.equals(await canvas.screenshot({ animations: "disabled" })),
  ).toBeTruthy();
  await page.keyboard.press("ArrowRight");
  const rotated = await canvas.screenshot();
  expect(before.equals(rotated)).toBeFalsy();
  const bounds = await canvas.boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 80,
    bounds.y + bounds.height / 2,
    { steps: 5 },
  );
  await page.mouse.up();
  expect(rotated.equals(await canvas.screenshot())).toBeFalsy();
});

test("lost WebGL context switches to the static scene", async ({ page }) => {
  await page.addInitScript(() => {
    window.sceneCleanup = { observers: 0, visibility: 0 };
    for (const Observer of [ResizeObserver, IntersectionObserver]) {
      const original = Observer.prototype.disconnect;
      Observer.prototype.disconnect = function () {
        window.sceneCleanup.observers += 1;
        return original.call(this);
      };
    }
    const remove = document.removeEventListener.bind(document);
    document.removeEventListener = (type, ...args) => {
      if (type === "visibilitychange") window.sceneCleanup.visibility += 1;
      return remove(type, ...args);
    };
  });
  await page.goto("/");
  await expect(page.locator('[data-scene-state="ready"]')).toBeVisible();
  await page.locator("canvas").evaluate((canvas) => {
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    gl.getExtension("WEBGL_lose_context").loseContext();
  });
  await expect(page.locator('[data-scene-state="fallback"]')).toBeVisible();
  expect(await page.evaluate(() => window.sceneCleanup)).toEqual({
    observers: 2,
    visibility: 1,
  });
  await expect(
    page.getByRole("button", { name: "Rotate sculpture left" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Explore JoulHub" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("project dialogs reopen and contain keyboard focus", async ({ page }) => {
  await page.goto("/");
  for (const name of [
    "JoulHub",
    "Smart Education",
    "MLC International School",
    "AUPP Alumni Connect",
  ]) {
    await page.getByRole("button", { name: `Explore ${name}` }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Close project" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Visit live site" }),
    ).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      page.getByRole("button", { name: "Close project" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Close project" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  }
});

test("failed contact delivery preserves the message for retry", async ({
  page,
}) => {
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 500, body: "Unavailable" }),
  );
  await page.goto("/#contact");
  await page.getByLabel("Your name").fill("Test visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page.getByLabel("Your project").fill("Keep this message.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("could not be sent");
  await expect(page.getByLabel("Your project")).toHaveValue(
    "Keep this message.",
  );
});

test("navigation, experience and credentials remain accessible", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About" })
    .click();
  await expect(page).toHaveURL(/#about$/);
  if (isMobile)
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await page.getByText("Founder", { exact: true }).click();
  await expect(
    page.getByText(/400\+ rooms across 100\+ properties/),
  ).toBeVisible();
  await page.getByText("Certifications", { exact: true }).click();
  await expect(
    page.getByRole("link", { name: /AWS Solutions Architect/ }),
  ).toBeVisible();
});

test("page and project dialog pass accessibility checks", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Ideas into real things." }),
  ).toBeVisible();
  const pageAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(pageAudit.violations).toEqual([]);
  await page.getByRole("button", { name: "Explore JoulHub" }).click();
  const dialogAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogAudit.violations).toEqual([]);
});
