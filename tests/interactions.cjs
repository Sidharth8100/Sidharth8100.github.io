const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const digest = (value) =>
  require("node:crypto").createHash("sha256").update(value).digest("hex");
fs.mkdirSync("test-results", { recursive: true });
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(
    await page.locator("#motion-toggle").getAttribute("aria-pressed"),
    "false",
  );
  const trigger = page.locator("#launch-journey"),
    r = await trigger.boundingBox();
  await page.mouse.move(r.x + r.width * 0.68, r.y + r.height * 0.48);
  await page.waitForTimeout(350);
  assert.equal(
    await page
      .locator(".orbital-scene")
      .evaluate((e) => e.classList.contains("is-engaged")),
    true,
  );
  await page.screenshot({ path: "test-results/reactive-hero.png" });
  const label = await page.locator("#launch-signal").boundingBox();
  const sculpture = await page.locator("#system-canvas").boundingBox();
  assert.ok(
    label.y >= sculpture.y + sculpture.height,
    "Launch label overlaps artwork",
  );
  const historyBeforeFlight = await page.evaluate(() => history.length);
  await trigger.click({ position: { x: r.width * 0.65, y: r.height * 0.5 } });
  await trigger.dispatchEvent("click"); // Re-entrant activation must not launch a second flight.
  assert.equal(await page.locator("#flight-overlay").isVisible(), true);
  await page.waitForTimeout(650);
  const fullscreen = await page.locator("#flight-overlay").boundingBox();
  assert.deepEqual(fullscreen, { x: 0, y: 0, width: 1440, height: 1000 });
  // Bright particles must escape the hero bounds, not merely fill a local canvas.
  const escaped = await page.locator("#flight-canvas").evaluate((c) => {
    const scene = document
      .querySelector(".orbital-scene")
      .getBoundingClientRect();
    const ctx = c.getContext("2d"),
      data = ctx.getImageData(0, 0, c.width, c.height).data;
    const ratio = c.width / innerWidth;
    let count = 0;
    for (let y = 0; y < c.height; y += 3)
      for (let x = 0; x < c.width; x += 3) {
        const i = (y * c.width + x) * 4;
        if (
          (x / ratio < scene.left ||
            x / ratio > scene.right ||
            y / ratio < scene.top ||
            y / ratio > scene.bottom) &&
          data[i + 1] > 100 &&
          data[i + 3] > 30
        )
          count++;
      }
    return count;
  });
  assert.ok(
    escaped > 50,
    `Only ${escaped} particle samples escaped the hero bounds`,
  );
  await page.screenshot({ path: "test-results/particle-burst.png" });
  await page.waitForURL("**/#contact");
  await page.waitForFunction(
    () => document.querySelector("#flight-overlay").hidden,
  );
  assert.equal(
    await page.locator(":focus").getAttribute("id"),
    "contact-title",
  );
  assert.equal(await trigger.isEnabled(), true);
  assert.equal(
    await page.evaluate(() => history.length),
    historyBeforeFlight + 1,
  );
  await page.screenshot({ path: "test-results/journey-arrival.png" });
  // Each destination is real navigation, not a decorative control.
  for (const destination of ["journey", "work", "arena", "about"]) {
    await page.locator(".identity").click();
    await page.locator(`[data-destination="${destination}"]`).click();
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(`**/#${destination}`);
    await page.waitForFunction(
      () => document.querySelector("#flight-overlay").hidden,
    );
    assert.equal(
      await page.locator(":focus").getAttribute("id"),
      `${destination}-title`,
    );
  }
  await page.locator(".identity").click();
  await page.locator('[data-destination="journey"]').click();
  await page.locator("#launch-signal").click();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#flight-overlay").isVisible(), false);
  assert.equal(new URL(page.url()).hash, "#journey");
  // Paused and reduced-motion users navigate instantly, without any overlay.
  await page.locator(".identity").click();
  await page.locator("#motion-toggle").click();
  const frozen = await page
    .locator("#system-canvas")
    .evaluate((c) => c.toDataURL());
  await page.waitForTimeout(100);
  assert.equal(
    digest(await page.locator("#system-canvas").evaluate((c) => c.toDataURL())),
    digest(frozen),
  );
  await trigger.click();
  assert.equal(await page.locator("#flight-overlay").isVisible(), false);
  assert.equal(new URL(page.url()).hash, "#journey");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".identity").click();
  await page.locator('[data-destination="arena"]').click();
  await trigger.click();
  assert.equal(new URL(page.url()).hash, "#arena");
  assert.equal(await page.locator("#flight-overlay").isVisible(), false);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".identity").click();
  await trigger.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.waitForFunction(
    () => document.querySelector("#flight-overlay").hidden,
  );
  assert.equal(await trigger.isEnabled(), true);
  // Direct artwork activation and bounded hover transforms.
  const art = page.locator(".project-art").first();
  await art.scrollIntoViewIfNeeded();
  await art.hover();
  await page.waitForTimeout(100);
  assert.equal(
    await art.evaluate((e) => e.classList.contains("is-reactive")),
    true,
  );
  await art.click();
  assert.equal(
    await page.locator("#project-dialog").evaluate((e) => e.open),
    true,
  );
  await page.keyboard.press("Escape");
  // Touch interaction keeps scrolling available and still activates on a tap.
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(base, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: "test-results/reactive-mobile.png" });
  await mobile
    .locator(".orbital-scene")
    .screenshot({ path: "test-results/mobile-sculpture.png" });
  await mobile.locator("#launch-journey").tap();
  await mobile.waitForURL("**/#contact");
  await mobile.waitForFunction(
    () => document.querySelector("#flight-overlay").hidden,
  );
  assert.equal(
    await mobile.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: pointer engagement, full-viewport outward particle flight, five destinations, keyboard focus, Escape, pause, reduced motion, resize recovery, project artwork, touch navigation.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
