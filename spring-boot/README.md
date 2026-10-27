# REALM in Spring Boot

A Spring Boot app that renders Thymeleaf templates, loads REALM and REALM UI from script tags, passes the signed-in user to a REALM component as attributes with `th:attr`, and posts a REALM UI form through Spring Security's CSRF protection.

Guide: https://realm.js.org/integrations/spring-boot/

## Versions

| | |
| --- | --- |
| Java | 25 (Eclipse Temurin) |
| Spring Boot | 4.1.2 |
| Spring Framework | 7.0.10 |
| Spring Security | 7.1.2 |
| Thymeleaf | 3.1.5 |
| Maven | 3.10 |
| REALM, REALM UI | latest from `https://realm.js.org/dist/` |

## Run without Docker

```sh
mvn spring-boot:run
```

Open http://localhost:8000. Set `PORT` to use another port.

## Run with Docker

```sh
docker build -t realm-spring-boot . && docker run --rm -p 8000:8000 realm-spring-boot
```

## Files

| File | What it does |
| --- | --- |
| `src/main/resources/templates/layout.html` | Fragments: the REALM tags in `<head>` and the component imports |
| `src/main/resources/templates/index.html` | `<user-card>` with `th:attr`, and the form with `<ui-input>` |
| `src/main/resources/templates/subscribed.html` | The page after the form posts |
| `src/main/java/org/realmjs/example/AccountController.java` | The page, the form post and the redirect |
| `src/main/java/org/realmjs/example/SecurityConfig.java` | Lets every page through without a login, with CSRF left on |
| `src/main/resources/static/components/user-card.html` | The REALM component, served as a static file |
