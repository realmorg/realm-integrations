# REALM with Turbo

An Express app that uses Turbo Drive and a Turbo Frame, loaded from a CDN module with no build step. REALM components keep working after Turbo swaps the body or a frame, and a REALM UI form posts through Turbo to a CSRF-protected route that answers with a 303 redirect.

Turbo does not care which server renders the HTML. Express and EJS stand in here for any backend that renders pages.

Guide: https://realm.js.org/integrations/hotwire/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| Turbo (`@hotwired/turbo`) | 8.0.23, from jsDelivr |
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
docker build -t realm-hotwire . && docker run --rm -p 8000:8000 realm-hotwire
```

## Files

| File | What it does |
| --- | --- |
| `server.js` | Routes, the session, CSRF protection with `csrf-sync`, and the 303 redirect after the form posts |
| `views/partials/head.ejs` | REALM and Turbo in `<head>`, the component imports at the top of `<body>`, and the navigation |
| `views/index.ejs` | `<user-card>` with the user as attributes, a `<turbo-frame>` that loads the team, and the subscribe form |
| `views/team.ejs` | The team page. Its `<turbo-frame id="team">` is what the frame on the account page shows |
| `views/subscribed.ejs` | The page Turbo shows after the redirect |
| `public/components/user-card.html` | The REALM component, served as a static file |
