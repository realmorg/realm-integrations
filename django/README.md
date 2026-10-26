# REALM in Django

A Django project with one app, `newsletter`, rendering a REALM component and posting a REALM UI form with `{% csrf_token %}`.

Guide: https://realm.js.org/integrations/django/

| | Version |
| --- | --- |
| Python | 3.14 |
| Django | 6.1.2 |
| WhiteNoise (static files in Docker) | 6.12.0 |
| gunicorn | 26.2.0 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `templates/base.html`: the REALM tags and `{% static %}` path to the component.
- `templates/newsletter/home.html`: `<user-card>` with server data, and the form.
- `newsletter/views.py`, `newsletter/forms.py`: the views and a `forms.Form` that validates the email.
- `static/components/user-card.html`: the REALM component.

## Run without Docker

```sh
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 8000
```

Open http://localhost:8000.
