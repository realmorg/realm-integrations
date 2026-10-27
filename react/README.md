# REALM in React

A React 19 app built with Vite. REALM and REALM UI load from the CDN, not from the bundle. React renders `<user-card>` and a REALM UI form, listens to the field's `change` event, and the form posts to a small Node server.

Guide: https://realm.js.org/integrations/react/

| | Version |
| --- | --- |
| Node.js | 24 |
| React, React DOM | 19.3.1 |
| Vite | 8.3.5 |
| @vitejs/plugin-react | 6.1.2 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `index.html`: the REALM tags, and the user data the server put in the page.
- `src/App.jsx`: `<user-card>`, the form and the `onchange` listener.
- `server.js`: serves `dist/` and handles `POST /subscribe`.
- `public/components/user-card.html`: the REALM component.

## Run without Docker

```sh
npm install
npm run build
npm start
```

Open http://localhost:8000. For development, run `npm start` in one terminal and `npm run dev` in another: Vite proxies `/subscribe` to the Node server.
