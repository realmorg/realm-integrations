# REALM in plain PHP

Plain PHP with no framework: a front controller, three templates and a session CSRF token.

Guide: https://realm.js.org/integrations/php/

| | Version |
| --- | --- |
| PHP | 8.5 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `public/index.php`: routes `GET /` and `POST /subscribe`, checks the CSRF token.
- `src/helpers.php`: `e()` for escaping, `csrf_token()`, `csrf_valid()`, `render()`.
- `templates/layout.php`: the REALM tags.
- `templates/home.php`: `<user-card>` with server data, and the form.
- `public/components/user-card.html`: the REALM component.

## Run without Docker

```sh
php -S localhost:8000 -t public public/index.php
```

Open http://localhost:8000. The built-in server is for development. In production, point Apache or nginx with PHP-FPM at `public/` and send every request that is not a file to `index.php`.
