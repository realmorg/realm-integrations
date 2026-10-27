# REALM with htmx

A Go server (standard library only) with `html/template`, htmx 2 and REALM on the same page. `hx-boost` turns the form into an htmx request, and a button swaps in more `<user-card>` elements, which REALM upgrades as they arrive. `http.CrossOriginProtection` rejects cross-site posts.

Guide: https://realm.js.org/integrations/htmx/

| | Version |
| --- | --- |
| Go | 1.27 |
| htmx | 2.0.11 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `templates/layout.html`: REALM and htmx tags, `hx-boost` on `<body>`.
- `templates/account.html`: `<user-card>` with server data, the `hx-get` button and the form.
- `templates/team.html`: the fragment htmx swaps in.
- `main.go`: routes and the form handler.
- `static/components/user-card.html`: the REALM component.

## Run without Docker

```sh
go run .
```

Open http://localhost:8000.
