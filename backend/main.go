package main

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
)

func redirectHandler(writer http.ResponseWriter, request *http.Request) {
	log.Println("Handling route %s", request.URL.Path)

	if request.URL.Path == "/" {
		http.ServeFile(writer, request, "./dist/index.html")
		return
	}

	matched, _ := regexp.MatchString(`^/[0-9a-zA-Z]+$`, request.URL.Path)
	if !matched {
		http.ServeFile(writer, request, "./dist/index.html")
		return
	}

	writer.WriteHeader(http.StatusNotFound)
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	err := json.NewEncoder(writer).Encode(map[string]string{"error": "Coming Soon"})
	if err != nil {
		log.Println("Error encoding JSON:", err)
		return
	}
	return
}

func main() {
	http.Handle("/admin/", http.StripPrefix("/admin/", http.FileServer(http.Dir("./dist/admin"))))
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/assets"))))

	http.HandleFunc("/", redirectHandler)

	log.Println("Listening on port 8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("There was a problem starting the server:", err)
	}
}
