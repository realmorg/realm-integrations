# REALM in Symfony

A Symfony app that renders Twig templates, loads REALM and REALM UI from script tags, passes the signed-in user to a REALM component as attributes, and submits a REALM UI field through a Symfony Form with CSRF protection.

Guide: https://realm.js.org/integrations/symfony/

## Versions

| | |
| --- | --- |
| PHP | 8.5 |
| Symfony | 8.1 (framework-bundle 8.1.9, form 8.1.9, security-csrf 8.1.0) |
| Twig | 3.30.0 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

The app was written by hand with the packages a Flex skeleton would install for this, so the config files are short. CSRF uses Symfony's stateless tokens (`config/packages/csrf.yaml`), as the framework-bundle recipe sets up since Symfony 7.2.

## Run without Docker

```sh
composer install
php -S localhost:8000 -t public
```

Open http://localhost:8000. With the Symfony CLI, `symfony serve` works too. PHP's built-in server is for development; deploy behind FrankenPHP, PHP-FPM or another production server.

## Run with Docker

```sh
docker build -t realm-symfony . && docker run --rm -p 8000:8000 realm-symfony
```

## Files

| File | What it does |
| --- | --- |
| `templates/base.html.twig` | The REALM tags and the component imports, shared by every page |
| `templates/account/index.html.twig` | `<user-card>` with the user as attributes, and the form with `<ui-input>` |
| `templates/account/subscribed.html.twig` | The page after the form posts |
| `src/Controller/AccountController.php` | Builds and handles the form, redirects after a valid submit |
| `src/Form/SubscribeType.php` | The form type: one email field |
| `config/packages/csrf.yaml` | Stateless CSRF for the form's `submit` token id |
| `public/components/user-card.html` | The REALM component, served as a static file |
