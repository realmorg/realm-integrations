# REALM in Next.js

A Next.js App Router app. The root layout loads REALM and REALM UI from script tags, a server component passes the signed-in user to a REALM component as attributes, and a REALM UI form posts to a Server Action, which Next.js protects by comparing the `Origin` and `Host` headers.

Guide: https://realm.js.org/integrations/nextjs/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| Next.js | 16.4.3 (App Router, `output: "standalone"`) |
| React, React DOM | 19.3.1 |
| TypeScript | 6.0.3 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
npm run build
npm start
```

Open http://localhost:3000, or set `PORT`. `npm run dev` starts the development server.

## Run with Docker

```sh
docker build -t realm-nextjs . && docker run --rm -p 8000:8000 realm-nextjs
```

## Files

| File | What it does |
| --- | --- |
| `app/layout.tsx` | The REALM tags and the component imports in the root layout |
| `app/page.tsx` | A server component: `<user-card>` with the user as attributes, and the form bound to the Server Action |
| `app/actions.ts` | The `subscribe` Server Action, which redirects to the result |
| `app/subscribed/page.tsx` | The page after the form posts |
| `custom-elements.d.ts` | JSX types for the custom element tags, so TypeScript accepts them |
| `public/components/user-card.html` | The REALM component, served as a static file |
