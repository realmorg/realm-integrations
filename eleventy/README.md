# REALM in Eleventy

An Eleventy site with a Nunjucks include for `<user-card>` and the user from `_data/user.json`. Eleventy builds static files, so `check.json` turns off the form check, and the form's `action` comes from `_data/site.json`.

Guide: https://realm.js.org/integrations/eleventy/

| | Version |
| --- | --- |
| Node.js | 24 |
| Eleventy | 3.1.7 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `src/_includes/base.njk`: the REALM tags.
- `src/_includes/user-card.njk`: the include.
- `src/index.njk`: the page and the form.
- `src/components/user-card.html`: the REALM component, copied through with `addPassthroughCopy`.

## Run without Docker

```sh
npm install
npm start
```

Open http://localhost:8000.
