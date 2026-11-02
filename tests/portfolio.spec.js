import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const liveSceneEnabled = process.env.VITE_UNICORN_ANIMATION === "true";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  // Never let automated checks deliver a real message.
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 200, body: "OK" }),
  );
});

test("portfolio content remains usable with reduced motion", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Selected work" }),
  ).toBeVisible();
  await expect(page.locator("[data-scene-state='static']")).toBeVisible();
  if (liveSceneEnabled) {
    await expect(
      page.getByRole("button", { name: "Reduced motion enabled" }),
    ).toBeDisabled();
  } else {
    await expect(page.locator(".motion-control")).toHaveCount(0);
  }
  await expect(page.locator(".project-entry")).toHaveCount(4);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("project filters preserve access to descriptions and live sites", async ({
  page,
}) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: /^Websites/ }).click();
  await expect(page.locator(".project-entry")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /^Websites/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: /^All work/ }).click();
  await expect(page.locator(".project-entry")).toHaveCount(4);
  const entry = page.locator(".project-entry").first();
  await entry.getByText("Behind the project", { exact: true }).click();
  await expect(
    entry.getByText(/An all-in-one property management/),
  ).toBeVisible();
  await expect(
    entry.getByRole("link", { name: "Visit project: JoulHub" }),
  ).toHaveAttribute("href", "https://joulhub.com");
  await entry.getByText("Behind the project", { exact: true }).press("Enter");
  await expect(
    entry.getByText(/An all-in-one property management/),
  ).not.toBeVisible();
});

test("navigation and credentials are keyboard accessible", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
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

test("failed scene loading preserves the poster and navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/unicornStudio.umd.js", (route) => route.abort());
  await page.goto("/");
  await expect(
    page.locator(
      liveSceneEnabled
        ? "[data-scene-state='fallback']"
        : "[data-scene-state='static']",
    ),
  ).toBeVisible();
  expect(
    await page
      .locator(".hero-poster")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#projects$/);
});

test("hero honors the animation setting and motion preferences", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  if (!liveSceneEnabled) {
    await expect(page.locator("[data-scene-state='static']")).toBeVisible();
    await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);
    await expect(page.locator("script[src*='unicornStudio']")).toHaveCount(0);
    await expect(page.locator(".motion-control")).toHaveCount(0);
    return;
  }
  await expect(page.locator("[data-scene-state='ready']")).toBeVisible({
    timeout: 40_000,
  });
  await expect(page.locator(".hero-canvas canvas")).toBeVisible();
  await expect(page.locator(".hero-canvas")).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(
    page.getByRole("button", { name: "Resume animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  const canvas = page.locator(".hero-canvas canvas");
  const frame = await canvas.screenshot({
    animations: "disabled",
    path: testInfo.outputPath("paused-before.png"),
  });
  await page.waitForTimeout(200);
  expect(
    frame.equals(
      await canvas.screenshot({
        animations: "disabled",
        path: testInfo.outputPath("paused-after.png"),
      }),
    ),
  ).toBeTruthy();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-scene-state='static']")).toBeVisible();
  await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);
});

test("contact validates inputs and reports delivery", async ({ page }) => {
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

test("failed contact delivery preserves the message", async ({ page }) => {
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
  await expect(
    page.getByRole("link", { name: "email me directly" }),
  ).toHaveAttribute("href", "mailto:al9725755@gmail.com");
});

test("page and expanded project pass accessibility checks", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".project-entry")
    .first()
    .getByText("Behind the project", { exact: true })
    .click();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test("skip link bypasses navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeFocused();
});

test("project facts preserve the supplied course and feature counts", async ({
  page,
}) => {
  await page.goto("/#projects");
  await expect(
    page.locator(".project-entry").filter({
      has: page.getByRole("heading", {
        name: "Smart Education",
        exact: true,
      }),
    }),
  ).toContainText("50+");
  await expect(
    page.locator(".project-entry").filter({
      has: page.getByRole("heading", {
        name: "MLC International School",
        exact: true,
      }),
    }),
  ).toContainText("7+");
});

test("all original artwork loads from responsive local assets", async ({
  page,
}) => {
  await page.goto("/");
  const artwork = page.locator(".hero-poster, .project-art");
  await expect(artwork).toHaveCount(5);
  for (const img of await artwork.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate((node) => node.complete && node.naturalWidth > 0),
      )
      .toBe(true);
    expect(await img.evaluate((node) => node.currentSrc)).toMatch(
      /\/artwork\/.*\.webp$/,
    );
  }
});

test("email copying and existing section links remain available", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copiedEmail = text;
        },
      },
    });
  });
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.__copiedEmail)).toBe(
    "al9725755@gmail.com",
  );
  for (const id of ["skills", "experience", "certifications"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("Denied");
    };
  });
  await page
    .getByRole("button", { name: /Copy email address|Email copied/ })
    .click();
  await expect(page.locator(".copy-feedback")).toContainText(
    "copy it manually",
  );
});
