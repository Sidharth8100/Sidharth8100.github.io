/* Run against a local server with Playwright installed:
   PORTFOLIO_PLAYWRIGHT=/path/to/playwright node tests/browser.cjs
   Optional CHROME_PATH overrides the browser executable. */
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const out = path.join(__dirname, "../test-results");
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [],
    badResponses = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(base, { waitUntil: "networkidle" });
  assert.match(await page.title(), /Sidharth Bhagat/);
  assert.equal(await page.locator(".project-card:visible").count(), 7);
  await page.screenshot({
    path: path.join(out, "desktop.png"),
    fullPage: true,
  });
  await page.screenshot({ path: path.join(out, "hero.png") });
  for (const [filter, count] of [
    ["systems", 2],
    ["ai", 3],
    ["apps", 2],
    ["all", 7],
  ]) {
    await page.locator(`[data-filter="${filter}"]`).click();
    assert.equal(await page.locator(".project-card:visible").count(), count);
    assert.equal(
      await page
        .locator(`[data-filter="${filter}"]`)
        .getAttribute("aria-pressed"),
      "true",
    );
  }
  for (const id of [
    "warden",
    "dataverse",
    "comics",
    "cifar",
    "encrypt",
    "tree",
    "bank",
    "jarvis",
  ]) {
    await page.locator(`[data-project="${id}"]`).click();
    assert.equal(
      await page.locator("#project-dialog").evaluate((e) => e.open),
      true,
    );
    assert.ok((await page.locator("#dialog-title").textContent()).length > 2);
    await page.keyboard.press("Escape");
    assert.equal(
      await page.locator("#project-dialog").evaluate((e) => e.open),
      false,
    );
  }
  await page.locator('[data-stage="1"]').click();
  assert.match(
    await page.locator("#stage-description").textContent(),
    /Snapshots/,
  );
  await page.locator("#trace-button").click();
  await page.waitForFunction(() =>
    document.querySelector("#trace-button").textContent.includes("again"),
  );
  assert.match(await page.locator("#stage-code").textContent(), /DELIVER/);
  await page.locator("#solve-path").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#path-status")
      .textContent.includes("Shortest path:"),
  );
  assert.match(await page.locator("#path-status").textContent(), /18 steps/);
  await page.locator("#reset-path").click();
  assert.equal(await page.locator(".grid-cell.path").count(), 0);
  // Block the start's four neighbors and exercise the unreachable case.
  for (const index of [15, 28, 30, 43])
    await page.locator(`[data-cell="${index}"]`).click();
  await page.locator("#solve-path").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#path-status")
      .textContent.includes("No path found"),
  );
  await page.locator("#reset-path").click();
  await page.locator('[data-cell="0"]').focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator(":focus").getAttribute("data-cell"), "1");
  await page.keyboard.press("Control+k");
  assert.equal(
    await page.locator("#command-dialog").evaluate((e) => e.open),
    true,
  );
  await page.locator("#command-search").fill("warden");
  assert.equal(await page.locator("#command-results button").count(), 1);
  await page.keyboard.press("Enter");
  assert.equal(
    await page.locator("#project-dialog").evaluate((e) => e.open),
    true,
  );
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+k");
  await page.locator("#command-search").fill("<img src=x>");
  assert.match(
    await page.locator("#command-results").textContent(),
    /No matches/,
  );
  assert.equal(await page.locator("#command-results img").count(), 0);
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator("#motion-toggle").getAttribute("aria-pressed"),
    "true",
  );
  await page.locator("#motion-toggle").click();
  assert.equal(
    await page.locator("#motion-toggle").getAttribute("aria-pressed"),
    "false",
  );
  await page.locator("#motion-toggle").click();
  await page.locator(".timeline details").nth(1).locator("summary").click();
  assert.equal(
    await page.locator(".timeline details").nth(1).getAttribute("open"),
    "",
  );
  // Every local reference, including the download and metadata share image, must resolve.
  const refs = await page.evaluate(() => [
    ...new Set(
      [...document.querySelectorAll("[src],[href]")]
        .flatMap((e) => [e.getAttribute("src"), e.getAttribute("href")])
        .filter((v) => v && !v.startsWith("#") && !/^[a-z]+:/i.test(v)),
    ),
  ]);
  for (const ref of refs) {
    const response = await context.request.get(new URL(ref, base).href);
    assert.equal(response.status(), 200, ref);
  }
  for (const width of [1440, 1024, 768, 760, 390, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, `Horizontal overflow at ${width}`);
    if (width === 390) {
      await page.screenshot({
        path: path.join(out, "mobile.png"),
        fullPage: true,
      });
      await page.locator(".menu-toggle").click();
      assert.equal(
        await page.locator(".menu-toggle").getAttribute("aria-expanded"),
        "true",
      );
      await page.locator('.site-header nav a[href="#arena"]').click();
      assert.equal(
        await page.locator(".menu-toggle").getAttribute("aria-expanded"),
        "false",
      );
    }
  }
  await page.goto(`${base}/#/work`, { waitUntil: "networkidle" });
  await page.waitForURL("**/#work");
  assert.equal(new URL(page.url()).hash, "#work");
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(base);
  assert.ok(await staticPage.locator("h1").isVisible());
  assert.ok(await staticPage.locator("noscript").isVisible());
  await noJS.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(badResponses, []);
  console.log(
    "PASS: filters, 8 dialogs, event trace, BFS reachable/unreachable, reset, keyboard grid, palette, reduced motion, disclosures, local assets, 7 responsive widths, legacy routing, no-JS fallback, zero page errors.",
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
