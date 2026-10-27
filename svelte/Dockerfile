FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG ORIGIN=http://localhost:8000
ENV ORIGIN=$ORIGIN
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY package.json ./
ENV NODE_ENV=production PORT=8000 HOST=0.0.0.0
EXPOSE 8000
CMD ["node", "build"]
