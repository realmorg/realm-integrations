FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM busybox:1.37
COPY --from=build /app/_site /www
EXPOSE 8000
CMD ["httpd", "-f", "-p", "8000", "-h", "/www"]
