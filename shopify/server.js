// A stand-in for Shopify's theme renderer, so the theme can be tested in a container. It renders
// templates/index.json with liquidjs and gives it the objects, filters and tags the theme uses.
import { readFileSync } from "node:fs";
import express from "express";
import { Liquid, Tag } from "liquidjs";

const port = Number(process.env.PORT ?? 8000);
const theme = new URL("./theme/", import.meta.url).pathname;
const assetPath = "/cdn/shop/t/1/assets/";

const engine = new Liquid({
  root: ["sections", "snippets", "layout"].map((folder) => theme + folder),
  extname: ".liquid",
});

const quotedPairs = (text) =>
  Object.fromEntries([...text.matchAll(/([\w-]+):\s*["']([^"']*)["']/g)].map(([, key, value]) => [key, value]));

// {% form 'customer' %} renders the same markup as on Shopify (shopify.dev/docs/api/liquid/tags/form).
class FormTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    const [, type = ""] = token.args.match(/^\s*["']([^"']+)["']/) ?? [];
    this.type = type;
    this.attributes = quotedPairs(token.args.replace(/^\s*["'][^"']+["']\s*,?/, ""));
    this.templates = [];
    while (remainTokens.length) {
      const next = remainTokens.shift();
      if (next.name === "endform") return;
      this.templates.push(parser.parseToken(next, remainTokens));
    }
    throw new Error("{% form %} is not closed");
  }

  *render(context) {
    const inner = yield this.liquid.renderer.renderTemplates(this.templates, context);
    const extra = Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join("");
    return `<form method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" class="contact-form"${extra}><input type="hidden" name="form_type" value="${this.type}" /><input type="hidden" name="utf8" value="✓" />${inner}</form>`;
  }
}

// {% schema %} renders nothing on Shopify. Its setting defaults fill section.settings here.
class SchemaTag extends Tag {
  constructor(token, remainTokens, liquid) {
    super(token, remainTokens, liquid);
    let json = "";
    while (remainTokens.length) {
      const next = remainTokens.shift();
      if (next.name === "endschema") return;
      json += next.getText();
    }
    throw new Error("{% schema %} is not closed");
  }

  render() {
    return "";
  }
}

engine.registerTag("form", FormTag);
engine.registerTag("schema", SchemaTag);
engine.registerFilter("asset_url", (file) => `${assetPath}${file}`);
engine.registerFilter("stylesheet_tag", (url) => `<link href="${url}" rel="stylesheet" type="text/css" media="all" />`);

const schemaDefaults = (type) => {
  const source = readFileSync(`${theme}sections/${type}.liquid`, "utf8");
  const [, json = "{}"] = source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/) ?? [];
  const { settings = [] } = JSON.parse(json);
  return Object.fromEntries(settings.map((setting) => [setting.id, setting.default]));
};

const customer = {
  name: "Ada Lovelace",
  first_name: "Ada",
  last_name: "Lovelace",
  email: "ada@example.com",
  metafields: { custom: { plan: { value: "Pro" } } },
};

const globals = {
  customer,
  request: { locale: { iso_code: "en" }, design_mode: false },
  content_for_header: "",
};

const renderSection = async (id, section) => {
  const settings = { ...schemaDefaults(section.type), ...section.settings };
  const html = await engine.renderFile(section.type, { ...globals, section: { id, settings } });
  return `<div id="shopify-section-${id}" class="shopify-section">${html}</div>`;
};

const template = JSON.parse(readFileSync(`${theme}templates/index.json`, "utf8"));

const app = express();
app.use(assetPath, express.static(`${theme}assets`));
app.use(express.urlencoded({ extended: false }));

// Like Shopify's Section Rendering API: /?section_id=account returns only that section.
app.get("/", async (req, res) => {
  const { section_id: sectionId } = req.query;
  if (sectionId) {
    const section = template.sections[sectionId];
    if (!section) return res.status(404).end();
    return res.send(await renderSection(sectionId, section));
  }
  const sections = await Promise.all(template.order.map((id) => renderSection(id, template.sections[id])));
  res.send(await engine.renderFile("theme", { ...globals, page_title: "Account", content_for_layout: sections.join("\n") }));
});

// Shopify answers this form itself. Locally, show what the theme posted.
app.post("/contact", (req, res) => {
  const fields = Object.entries(req.body).map(([key, value]) => `${key} = ${value}`);
  res.type("text/plain").send(`The theme posted:\n${fields.join("\n")}\n`);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
