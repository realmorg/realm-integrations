# REALM in a Shopify theme

A minimal Shopify theme (a layout, one section, one snippet and a JSON template) that loads REALM and REALM UI from script tags, passes the signed-in customer to a REALM component as attributes, and renders a newsletter form with a REALM UI input.

Shopify themes only run on Shopify, so this folder also has `server.js`: a small Node server that renders the theme with [liquidjs](https://liquidjs.com) and stands in for the parts of Shopify the theme uses (the `customer` object, `section.settings` from the schema, the `asset_url` and `stylesheet_tag` filters, the `{% form 'customer' %}` tag and the Section Rendering API's `?section_id=`).

What CI checks here: the theme's Liquid renders, `<user-card>` upgrades and shows the customer's name and plan. The form is not checked (`check.json` has `"form": false`), because the newsletter form posts to Shopify's own `/contact` endpoint with the field `contact[email]`. Locally, `/contact` only prints what the theme posted.

Guide: https://realm.js.org/integrations/shopify/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| liquidjs | 10.30.0 |
| Express | 5.3.0 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
npm start
```

Open http://localhost:8000. Set `PORT` to use another port.

## Use the theme on a store

Copy the files in `theme/` into a theme (for example a copy of Dawn) with the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli), and add the `account-card` section from the theme editor. The section reads the plan from a customer metafield, `custom.plan`.

## Run with Docker

```sh
docker build -t realm-shopify . && docker run --rm -p 8000:8000 realm-shopify
```

## Files

| File | What it does |
| --- | --- |
| `theme/layout/theme.liquid` | The REALM tags, the theme's stylesheet and the REALM UI imports |
| `theme/sections/account-card.liquid` | `<user-card>` with the customer as attributes, the newsletter form, and the section schema |
| `theme/snippets/user-card.liquid` | The REALM component, defined inline with `<script type="realm">` |
| `theme/templates/index.json` | The home page template with one `account-card` section |
| `theme/assets/app.css` | Page layout |
| `server.js` | The local stand-in for Shopify's renderer. Not part of the theme |
