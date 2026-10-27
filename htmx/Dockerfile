FROM golang:1.27-alpine AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /server .

FROM scratch
COPY --from=build /server /server
EXPOSE 8000
CMD ["/server"]
