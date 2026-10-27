FROM alpine:3.24 AS build
ARG HUGO_VERSION=0.168.0
ARG TARGETARCH
RUN wget -qO- "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-${TARGETARCH:-amd64}.tar.gz" | tar -xz -C /usr/local/bin hugo
WORKDIR /src
COPY . .
RUN hugo --destination /site

FROM busybox:1.37
COPY --from=build /site /www
EXPOSE 8000
CMD ["httpd", "-f", "-p", "8000", "-h", "/www"]
