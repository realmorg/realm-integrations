package main

import (
	"embed"
	"html/template"
	"log"
	"net/http"
	"os"
)

//go:embed templates
var templateFiles embed.FS

//go:embed static
var staticFiles embed.FS

type User struct {
	Name string
	Plan string
}

var pages = map[string]*template.Template{
	"index":      template.Must(template.ParseFS(templateFiles, "templates/layout.html", "templates/index.html")),
	"subscribed": template.Must(template.ParseFS(templateFiles, "templates/layout.html", "templates/subscribed.html")),
}

func render(w http.ResponseWriter, page string, data any) {
	if err := pages[page].ExecuteTemplate(w, "layout", data); err != nil {
		log.Print(err)
		http.Error(w, "Could not render the page", http.StatusInternalServerError)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("GET /static/", http.FileServerFS(staticFiles))

	mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
		render(w, "index", map[string]any{
			"Title": "Account",
			"User":  User{Name: "Ada Lovelace", Plan: "Pro"},
		})
	})

	mux.HandleFunc("POST /subscribe", func(w http.ResponseWriter, r *http.Request) {
		render(w, "subscribed", map[string]any{
			"Title": "Subscribed",
			"Email": r.PostFormValue("email"),
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	handler := http.NewCrossOriginProtection().Handler(mux)
	log.Printf("Listening on http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
