# REALM in SvelteKit

A SvelteKit app built with `adapter-node`. `src/app.html` loads REALM and REALM UI from script tags, a `load` function passes the signed-in user to a REALM component as attributes, and a REALM UI form posts to a SvelteKit form action, which checks the request's `Origin` against CSRF.

Guide: https://realm.js.org/integrations/svelte/

## Versions

| | |
| --- | --- |
| Node.js | 24 LTS |
| Svelte | 5.57.2 |
| SvelteKit | 3.1.0 |
| @sveltejs/adapter-node | 6.0.0 |
| @sveltejs/vite-plugin-svelte | 7.3.1 |
| Vite | 8.3.5 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
npm install
ORIGIN=http://localhost:8000 npm run build
npm start
```

Open http://localhost:8000.

`ORIGIN` is read at build time into `paths.origin`. SvelteKit 3 compares it with the `Origin` header of every form `POST`. Without it, `adapter-node` assumes `https://` plus the `Host` header, so a plain `http://localhost` form post is refused with "Cross-site POST form submissions are forbidden". Behind an HTTPS proxy that forwards `Host`, you can leave it unset. `npm run dev` skips the check.

## Run with Docker

```sh
docker build -t realm-svelte . && docker run --rm -p 8000:8000 realm-svelte
```

To publish on another port, build with `--build-arg ORIGIN=http://localhost:<port>`.

## Files

| File | What it does |
| --- | --- |
| `vite.config.js` | The SvelteKit plugin with its config (SvelteKit 3 has no `svelte.config.js`) and `paths.origin` |
| `src/app.html` | The REALM tags and the component imports, around `%sveltekit.body%` |
| `src/routes/+page.server.js` | `load` for the user, and the `subscribe` form action |
| `src/routes/+page.svelte` | `<user-card>` with the user as attributes, the form, and the result |
| `static/components/user-card.html` | The REALM component, served as a static file |
