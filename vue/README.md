# REALM in Vue

A Vue single-page app built with Vite. The page loads REALM and REALM UI from script tags, Vue passes the signed-in user from a same-origin API to a REALM component, and a REALM UI form is sent with `fetch` to an Express endpoint that refuses cross-origin posts.

Guide: https://realm.js.org/integrations/vue/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| Vue | 3.5.44 |
| Vue Router | 5.4.0 |
| Vite | 8.3.5 |
| @vitejs/plugin-vue | 6.0.10 |
| Express (API and static server) | 5.3.0 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
npm run build
npm start
```

Open http://localhost:8000. Set `PORT` to use another port.

For development, keep `npm start` running for the API and run `npm run dev` in a second terminal. Vite proxies `/api` to port 8000.

## Run with Docker

```sh
docker build -t realm-vue . && docker run --rm -p 8000:8000 realm-vue
```

## Files

| File | What it does |
| --- | --- |
| `vite.config.js` | Tells the Vue compiler that `user-card` and `ui-*` tags are custom elements |
| `index.html` | The REALM tags and the component imports, outside the Vue app |
| `src/views/AccountView.vue` | Loads the user, binds it to `<user-card>`, and submits the form with `FormData` |
| `src/views/SubscribedView.vue` | The view after the form posts |
| `server.js` | `/api/me`, `/api/subscribe` with an Origin check, and the built app |
| `public/components/user-card.html` | The REALM component, copied to `dist/` as a static file |
