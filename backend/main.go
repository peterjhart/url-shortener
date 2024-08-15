package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

const html = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>URL Shortener</title>
	</head>
	<body>
		<h1>URL Shortener</h1>
		<p>
			This is a basic URL shortener.
		</p>
	</body>
</html>
`

func handler(writer http.ResponseWriter, request *http.Request) {
	tmpl, err := template.New("index").Parse(html)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
	}

	err = tmpl.Execute(writer, nil)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", handler)

	fmt.Println("Listening on port 8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("There was a problem starting the server:", err)
	}
}
