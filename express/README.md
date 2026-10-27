# REALM in Express

An Express app that renders EJS views, loads REALM and REALM UI from script tags, passes the signed-in user to a REALM component as attributes, and posts a REALM UI form through a CSRF-protected Express route.

Guide: https://realm.js.org/integrations/express/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| Express | 5.3.0 |
| EJS | 7.0.2 |
| express-session | 1.19.0 |
| csrf-sync | 4.2.1 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
npm start
```

Open http://localhost:8000. Set `PORT` to use another port.

## Run with Docker

```sh
docker build -t realm-express . && docker run --rm -p 8000:8000 realm-express
```

## Files

| File | What it does |
| --- | --- |
| `server.js` | Routes, the session, and CSRF protection with `csrf-sync` |
| `views/partials/head.ejs` | The REALM tags and the component imports, shared by every view |
| `views/index.ejs` | `<user-card>` with the user as attributes, and the subscribe form |
| `views/subscribed.ejs` | The page after the form posts |
| `public/components/user-card.html` | The REALM component, served as a static file |
