FROM elixir:1.20-otp-29-alpine AS build
ENV MIX_ENV=prod HEX_HTTP_TIMEOUT=120
WORKDIR /app
RUN mix local.hex --force
COPY mix.exs mix.lock ./
RUN mix deps.get --only prod && mix deps.compile
COPY config config
COPY lib lib
COPY priv priv
RUN mix release

FROM alpine:3.23
RUN apk add --no-cache libstdc++ ncurses-libs openssl
WORKDIR /app
COPY --from=build /app/_build/prod/rel/realm_phoenix ./
ENV PHX_SERVER=true
EXPOSE 8000
CMD ["bin/realm_phoenix", "start"]
