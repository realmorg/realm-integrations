FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction
COPY . .
RUN composer dump-autoload --classmap-authoritative --no-dev

FROM php:8.5-cli-alpine
WORKDIR /app
COPY --from=vendor /app ./
ENV APP_ENV=prod
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
