# REALM in WordPress

A classic theme, `realm-example`, that enqueues REALM with the Script Modules API, renders a REALM component with data from PHP, and posts a REALM UI form to `admin-post.php` with a nonce.

Guide: https://realm.js.org/integrations/wordpress/

| | Version |
| --- | --- |
| WordPress | 7.1.3 (official `wordpress:7.1.3-php8.5-apache` image) |
| PHP | 8.5 |
| WP-CLI | 2.12.0 |
| SQLite Database Integration | 3.1.1 (Docker only, so the example is one container) |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `realm-example/functions.php`: enqueues the stylesheets and `realm.js`, prints the `<import-element>` tags on `wp_body_open`, handles the form on `admin_post_nopriv_realm_subscribe`.
- `realm-example/index.php`: `<user-card>` with server data, and the form.
- `realm-example/components/user-card.html`: the REALM component.
- `apache2-setup`, `Dockerfile`: install WordPress on first start and activate the theme.

## Run without Docker

Copy `realm-example/` into `wp-content/themes/` of any WordPress 6.5 or newer site and activate it under Appearance → Themes. With [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/):

```sh
npx @wordpress/env start
```

with a `.wp-env.json` of `{ "themes": ["./realm-example"] }`.
