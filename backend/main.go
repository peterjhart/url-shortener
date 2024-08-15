package main

import (
  "fmt"
  "log"
  "net/http"
  "os"
  "path/filepath"
)

func handler(writer http.ResponseWriter, request *http.Request) {
  if request.URL.Path != "/" {
    http.NotFound(writer, request)
    return
  }

  cwd, err := os.Getwd()
  if err != nil {
    http.Error(writer, err.Error(), http.StatusInternalServerError)
    log.Printf("Error getting current working directory: %v", err)
    return
  }

  htmlFilePath := filepath.Join(cwd, "dist", "index.html")

  content, err := os.ReadFile(htmlFilePath)
  if err != nil {
    http.Error(writer, err.Error(), http.StatusInternalServerError)
    log.Printf("Error reading %s: %v", htmlFilePath, err)
    return
  }

  writer.Header().Set("Content-Type", "text/html; charset=utf-8")

  _, err = writer.Write(content)
  if err != nil {
    http.Error(writer, err.Error(), http.StatusInternalServerError)
    log.Printf("Error writing %s: %v", htmlFilePath, err)
  }
}

func main() {
  http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./dist"))))
  http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/assets"))))

  fmt.Println("Listening on port 8080")

  if err := http.ListenAndServe(":8080", nil); err != nil {
    log.Fatal("There was a problem starting the server:", err)
  }
}
