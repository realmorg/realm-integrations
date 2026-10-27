# REALM in Phoenix LiveView

A Phoenix app with no asset build. The root layout loads REALM, REALM UI and the LiveView client from script tags (the LiveView client through an import map that points at the files inside `deps/`). A LiveView renders a REALM component from its assigns and patches its attributes over the socket, and a REALM UI form posts to a controller through Phoenix's CSRF protection.

Guide: https://realm.js.org/integrations/phoenix/

## Versions

| | |
| --- | --- |
| Elixir | 1.20 on Erlang/OTP 29 |
| Phoenix | 1.8.16 |
| Phoenix LiveView | 1.2.13 |
| Phoenix.HTML | 4.3.0 |
| Bandit | 1.14.0 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

There is no Ecto, esbuild or Tailwind: the app was written by hand rather than with `mix phx.new`, to keep only what the example needs.

## Run without Docker

```sh
mix deps.get
mix phx.server
```

Open http://localhost:8000. Set `PORT` to use another port.

## Run with Docker

```sh
docker build -t realm-phoenix . && docker run --rm -p 8000:8000 realm-phoenix
```

## Files

| File | What it does |
| --- | --- |
| `lib/realm_phoenix_web/components/layouts/root.html.heex` | The REALM tags, the import map for the LiveView client, and the component imports |
| `lib/realm_phoenix_web/live/account_live.ex` | `<user-card>` with the user from assigns, a button that changes the plan over the socket, and the subscribe form |
| `lib/realm_phoenix_web/controllers/subscription_controller.ex` | Handles the form post and the page after it |
| `lib/realm_phoenix_web/endpoint.ex` | Serves `priv/static` and the LiveView client files from `deps/` |
| `lib/realm_phoenix_web/router.ex` | The browser pipeline with `protect_from_forgery` |
| `priv/static/components/user-card.html` | The REALM component, served as a static file |
