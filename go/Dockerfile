FROM golang:1.27-alpine AS build
WORKDIR /src
COPY go.mod ./
COPY . .
RUN CGO_ENABLED=0 go build -o /realm-go .

FROM gcr.io/distroless/static-debian12
COPY --from=build /realm-go /realm-go
EXPOSE 8000
ENTRYPOINT ["/realm-go"]
