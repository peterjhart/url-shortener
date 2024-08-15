package main

import (
  "fmt"
  "log"
  "net/http"
)

func main() {
  http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./dist"))))
  http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/assets"))))

  fmt.Println("Listening on port 8080")

  if err := http.ListenAndServe(":8080", nil); err != nil {
    log.Fatal("There was a problem starting the server:", err)
  }
}
