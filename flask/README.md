# REALM in Flask

A one-file Flask app with Jinja templates. Flask-WTF's `CSRFProtect` guards the form.

Guide: https://realm.js.org/integrations/flask/

| | Version |
| --- | --- |
| Python | 3.14 |
| Flask | 3.1.3 |
| Flask-WTF | 1.3.0 |
| gunicorn | 26.2.0 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `app.py`: the routes and `CSRFProtect`.
- `templates/base.html`: the REALM tags, with `url_for('static', …)` for the component file.
- `templates/account.html`: `<user-card>` with server data, and the form.
- `static/components/user-card.html`: the REALM component.

## Run without Docker

```sh
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
flask --app app run --port 8000
```

Open http://localhost:8000.
