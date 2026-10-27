# REALM in Rails

A minimal Rails app (no database) that loads REALM through importmap-rails next to Turbo, renders a REALM component with `tag.user_card`, and posts a REALM UI form with `form_with` and its authenticity token.

Guide: https://realm.js.org/integrations/rails/

| | Version |
| --- | --- |
| Ruby | 4.0 |
| Rails | 8.1.4 |
| importmap-rails | 2.2.3 |
| turbo-rails | 2.0.23 |
| Propshaft | 1.3.2 |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `config/importmap.rb`, `app/javascript/application.js`: REALM pinned from realm.js.org and imported next to Turbo.
- `app/views/layouts/application.html.erb`: stylesheets and `<import-element>` tags.
- `app/views/subscriptions/new.html.erb`: `<user-card>` with server data, and the form.
- `app/controllers/subscriptions_controller.rb`: the form handler, which redirects as Turbo expects.
- `public/components/user-card.html`: the REALM component.

## Run without Docker

```sh
bundle install
bin/rails server -p 8000
```

Open http://localhost:8000.
