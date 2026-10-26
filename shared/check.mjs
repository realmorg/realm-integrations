// Checks one running example: the REALM component upgraded with the server's data, and the
// REALM UI form posted through the stack's own form handling.
//
//   node shared/check.mjs http://localhost:8000/ [folder]
//
// A folder may hold check.json with { "form": false } when its stack has no server to post to
// (static site generators); the check then stops after the component.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const [url = "http://localhost:8000/", folder] = process.argv.slice(2);
const config = folder && existsSync(join(folder, "check.json")) ? JSON.parse(readFileSync(join(folder, "check.json"), "utf8")) : {};
const { name = "Ada Lovelace", plan = "Pro", form = true } = config;
const email = "ada@example.com";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

try {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(() => customElements.get("user-card") && customElements.get("ui-input"), null, { timeout: 15000 });
  const card = page.locator("user-card");
  await card.waitFor();
  const text = await card.evaluate((element) => element.shadowRoot?.textContent ?? "");
  if (!text.includes(name)) throw new Error(`<user-card> does not show the name "${name}": ${text.trim()}`);
  if (!text.includes(plan)) throw new Error(`<user-card> does not show the plan "${plan}": ${text.trim()}`);

  if (!form) {
    if (errors.length) throw new Error(`Console errors:\n${errors.join("\n")}`);
    console.log(`ok ${url} (component only)`);
    process.exit(0);
  }
  await page.locator("ui-input[name=email] input").fill(email);
  await Promise.all([page.waitForNavigation(), page.locator("form [type=submit]").first().click()]);
  const body = await page.locator("body").innerText();
  if (!body.includes(`Subscribed: ${email}`)) throw new Error(`The form did not reach the server. Page says: ${body.slice(0, 300)}`);
  if (errors.length) throw new Error(`Console errors:\n${errors.join("\n")}`);
  console.log(`ok ${url}`);
} catch (error) {
  console.error(`FAIL ${url}\n${error.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
