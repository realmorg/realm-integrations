# REALM in FastAPI

A FastAPI app that renders Jinja2 templates, loads REALM and REALM UI from script tags, passes the signed-in user to a REALM component as attributes, and posts a REALM UI form to a FastAPI route that checks a session-bound CSRF token.

Guide: https://realm.js.org/integrations/fastapi/

## Versions

| | |
| --- | --- |
| Python | 3.15 |
| FastAPI | 0.162.0 (Starlette 1.10.0) |
| Jinja2 | 3.1.6 |
| Uvicorn | 0.54.0 |
| python-multipart | 0.0.32 (needed for `Form`) |
| itsdangerous | 2.2.0 (needed for `SessionMiddleware`) |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

Open http://localhost:8000.

## Run with Docker

```sh
docker build -t realm-fastapi . && docker run --rm -p 8000:8000 realm-fastapi
```

## Files

| File | What it does |
| --- | --- |
| `app/main.py` | Routes, the session, and the CSRF token check |
| `app/templates/base.html` | The REALM tags and the component imports, shared by every page |
| `app/templates/index.html` | `<user-card>` with the user as attributes, and the subscribe form |
| `app/templates/subscribed.html` | The page after the form posts |
| `app/static/components/user-card.html` | The REALM component, served by `StaticFiles` |
