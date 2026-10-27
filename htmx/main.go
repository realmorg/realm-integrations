package main

import (
	"embed"
	"html/template"
	"log"
	"net/http"
	"net/mail"
)

//go:embed templates static
var files embed.FS

var pages = template.Must(template.ParseFS(files, "templates/*.html"))

type User struct {
	Name string
	Plan string
}

var team = []User{
	{Name: "Grace Hopper", Plan: "Team"},
	{Name: "Katherine Johnson", Plan: "Free"},
}

func render(w http.ResponseWriter, name string, data any) {
	if err := pages.ExecuteTemplate(w, name, data); err != nil {
		log.Print(err)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("GET /static/", http.FileServerFS(files))

	mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
		render(w, "account.html", User{Name: "Ada Lovelace", Plan: "Pro"})
	})

	mux.HandleFunc("GET /team", func(w http.ResponseWriter, r *http.Request) {
		render(w, "team.html", team)
	})

	mux.HandleFunc("POST /subscribe", func(w http.ResponseWriter, r *http.Request) {
		address, err := mail.ParseAddress(r.FormValue("email"))
		if err != nil {
			http.Error(w, "Enter a valid email address.", http.StatusBadRequest)
			return
		}
		render(w, "subscribed.html", address.Address)
	})

	handler := http.NewCrossOriginProtection().Handler(mux)
	log.Print("listening on :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
