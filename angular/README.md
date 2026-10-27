# REALM in Angular

An Angular app built with the Angular CLI. `src/index.html` loads REALM and REALM UI from script tags, a standalone component binds the signed-in user from a same-origin API to a REALM component, and a reactive form with a REALM UI input posts through `HttpClient`, whose built-in XSRF header the Express server checks.

Guide: https://realm.js.org/integrations/angular/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS (24.15 or newer, required by the Angular CLI) |
| Angular | 22.2.3 (CLI and `@angular/build` 22.2.4) |
| TypeScript | 6.0.3 |
| Express (API and static server) | 5.3.0 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
npm run build
npm start
```

Open http://localhost:8000. Set `PORT` to use another port.

For development, keep `npm start` running for the API and run `npm run dev` in a second terminal. `ng serve` proxies `/api` to port 8000 (`proxy.conf.json`).

## Run with Docker

```sh
docker build -t realm-angular . && docker run --rm -p 8000:8000 realm-angular
```

## Files

| File | What it does |
| --- | --- |
| `src/index.html` | The REALM tags and the component imports, outside `<app-root>` |
| `src/styles.css` | Page styles, and the rule that keeps Angular's component hosts visible under `realm.css` |
| `src/app/app.config.ts` | `provideHttpClient()` (XSRF on by default) and the router with component input binding |
| `src/app/pages/account.ts` | `CUSTOM_ELEMENTS_SCHEMA`, `<user-card>` property bindings, and the form with `ngDefaultControl` |
| `src/app/pages/subscribed.ts` | The page after the form posts |
| `server.mjs` | `/api/me`, `/api/subscribe` with the XSRF check, and the built app |
| `public/components/user-card.html` | The REALM component, copied to the build as a static file |
