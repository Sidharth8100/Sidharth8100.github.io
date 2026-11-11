// Run from repository root with the local preview server active. See README.
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
fs.mkdirSync("test-results", { recursive: true });
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  const c = await b.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const p = await c.newPage();
  await p.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await p.screenshot({ path: "test-results/mobile-hero.png" });
  await p
    .locator(".algorithm-lab")
    .screenshot({ path: "test-results/mobile-playground.png" });
  await p.addScriptTag({
    path: process.env.PORTFOLIO_AXE || require.resolve("axe-core/axe.min.js"),
  });
  let reports = [];
  const audit = async (label) => {
    const violations = await p.evaluate(async () =>
      (
        await axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        })
      ).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    );
    reports.push({ label, violations });
  };
  await audit("mobile");
  await p.locator('[data-project="warden"]').click();
  await audit("project-dialog");
  await p.screenshot({ path: "test-results/mobile-dialog.png" });
  await p.keyboard.press("Escape");
  await p.keyboard.press("Control+k");
  await audit("command-dialog");
  await p.keyboard.press("Escape");
  await p.locator("#copy-email").click();
  await p.waitForFunction(() =>
    document.querySelector("#copy-status").textContent.includes("copied"),
  );
  assert.match(await p.locator("#copy-status").textContent(), /copied/);
  assert.equal(
    await p.evaluate(() => navigator.clipboard.readText()),
    "sidharthbhagat2005@gmail.com",
  );
  await p.emulateMedia({ reducedMotion: "no-preference" });
  await p.locator("#solve-path").click();
  await p.locator("#reset-path").click();
  await p.waitForTimeout(200);
  assert.equal(await p.locator(".grid-cell.visited").count(), 0);
  assert.equal(await p.locator(".grid-cell.path").count(), 0);
  assert.equal(await p.locator("#solve-path").isEnabled(), true);
  const social = await c.request.get(
    "http://127.0.0.1:4173/assets/social-preview.png",
  );
  assert.equal(social.status(), 200);
  console.log(JSON.stringify(reports, null, 2));
  fs.writeFileSync(
    "test-results/accessibility.json",
    JSON.stringify(reports, null, 2),
  );
  assert.ok(reports.every((r) => r.violations.length === 0));
  console.log(
    "PASS: mobile and dialog accessibility, clipboard, cancel/reset during animation, social asset.",
  );
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
