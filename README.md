# REALM integrations

Working examples of [REALM](https://realm.js.org) web components in other stacks: Django, Rails, Laravel, Astro, WordPress and more. Each folder is a small app that the matching guide on [realm.js.org/integrations](https://realm.js.org/integrations/) walks through.

Every example does the same three things, in the stack's own files and template language:

1. Loads REALM and REALM UI from a script tag. No build step.
2. Renders a REALM component, `<user-card>`, with data from the server passed as attributes.
3. Posts a REALM UI form (`<ui-input>` inside a native `<form>`) to the stack's own form handling, with its CSRF protection where the stack has one, and shows the result.

## Run one

Each folder has a `Dockerfile` that serves the app on port 8000:

```sh
cd django
docker build -t realm-django . && docker run --rm -p 8000:8000 realm-django
```

Open http://localhost:8000. The folder's README also shows how to run it without Docker.

## The check

CI builds every folder and runs `shared/check.mjs` against it in Chromium. The check passes when:

- `<user-card>` is defined and shows the name and plan the server rendered into its attributes,
- submitting the form with an email address reaches the server and the next page shows `Subscribed: <email>`.

```sh
npm install
node shared/check.mjs http://localhost:8000/
```

## Licence

MIT
