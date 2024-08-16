package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"regexp"
)

func redirectHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("Handling route %s", request.URL.Path)

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
	json.NewEncoder(writer).Encode(map[string]string{"error": "Coming Soon"})
	return
}

func main() {
	//http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./dist"))))
	http.Handle("/admin/", http.StripPrefix("/admin/", http.FileServer(http.Dir("./dist/admin"))))
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/assets"))))

	http.HandleFunc("/", redirectHandler)

	fmt.Println("Listening on port 8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("There was a problem starting the server:", err)
	}
}
