# REALM in Go

A Go server that renders `html/template` pages, loads REALM and REALM UI from script tags, passes the signed-in user to a REALM component as attributes, and posts a REALM UI form behind `http.CrossOriginProtection`. Standard library only.

Guide: https://realm.js.org/integrations/go/

## Versions

| | |
| --- | --- |
| Go | 1.27 (`http.CrossOriginProtection` needs 1.25 or newer) |
| Dependencies | none, standard library only |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
go run .
```

Open http://localhost:8000. Set `PORT` to use another port.

## Run with Docker

```sh
docker build -t realm-go . && docker run --rm -p 8000:8000 realm-go
```

## Files

| File | What it does |
| --- | --- |
| `main.go` | Routes, templates and static files embedded with `go:embed`, CSRF protection with `http.NewCrossOriginProtection()` |
| `templates/layout.html` | The REALM tags and the component imports, shared by every page |
| `templates/index.html` | `<user-card>` with the user as attributes, and the subscribe form |
| `templates/subscribed.html` | The page after the form posts |
| `static/components/user-card.html` | The REALM component, served as a static file |
