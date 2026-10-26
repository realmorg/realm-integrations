# REALM in Astro

An Astro site in server mode with the Node adapter. The page renders a REALM component with Astro expressions, and the form posts to an Astro page that reads `Astro.request.formData()`. Astro's origin check (`security.checkOrigin`, on by default) rejects cross-site posts.

Guide: https://realm.js.org/integrations/astro/

| | Version |
| --- | --- |
| Node.js | 24 |
| Astro | 7.4.2 |
| @astrojs/node | 11.1.9 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `src/layouts/Layout.astro`: the REALM tags, with `is:inline` on the REALM script.
- `src/pages/index.astro`: `<user-card>` with server data, and the form.
- `src/pages/subscribe.astro`: the form handler.
- `public/components/user-card.html`: the REALM component.

## Run without Docker

```sh
npm install
npm run dev -- --port 8000
```

Open http://localhost:8000.
