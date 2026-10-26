# REALM in Hugo

A Hugo site with a `user-card` shortcode. Hugo builds static files, so there is no server to post the form to: `check.json` turns off the form check, and the form's `action` comes from `params.subscribeAction` in `hugo.toml`.

Guide: https://realm.js.org/integrations/hugo/

| | Version |
| --- | --- |
| Hugo | 0.168.0 (standard edition) |
| REALM, REALM UI | latest from realm.js.org/dist |

## Files

- `layouts/baseof.html`: the REALM tags.
- `layouts/_shortcodes/user-card.html`: the shortcode.
- `content/_index.md`: uses the shortcode.
- `layouts/home.html`: the form.
- `static/components/user-card.html`: the REALM component.

## Run without Docker

```sh
hugo server --port 8000
```

Open http://localhost:8000.
