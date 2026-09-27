import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "C:/Users/Dell/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const htmlPath = path.resolve("deliverables/week-1-wireframe-approval.html");
const outputPath = path.resolve("deliverables/week-1-wireframe-approval.png");
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

await page.goto(`file:///${htmlPath.replaceAll("\\", "/")}`);
await page.screenshot({ path: outputPath, fullPage: false });
await browser.close();

console.log(outputPath);
