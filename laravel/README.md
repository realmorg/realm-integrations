# REALM in Laravel

A Laravel app with one controller, a Blade layout component and two views. The form posts with `@csrf` and is validated with `$request->validate()`.

Guide: https://realm.js.org/integrations/laravel/

| | Version |
| --- | --- |
| PHP | 8.5 |
| Laravel | 13.38 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `resources/views/components/layout.blade.php`: the REALM tags.
- `resources/views/account.blade.php`: `<user-card>` with server data, and the form.
- `app/Http/Controllers/SubscriptionController.php`: the page and the form handler.
- `public/components/user-card.html`: the REALM component. It is a static file, so Blade never compiles it.

## Run without Docker

```sh
composer install
cp .env.example .env
php artisan key:generate
php artisan serve --port=8000
```

Open http://localhost:8000.
