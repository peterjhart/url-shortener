package main

import (
	"context"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"os"
	"time"
	"url-shortener/backend/handlers"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoURI := os.Getenv("MONGO_URI")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
		return
	}
	defer client.Disconnect(ctx)

	db := client.Database("url_shortener")
	linksCollection := db.Collection("links")

	r := mux.NewRouter()

	r.HandleFunc("/", handlers.HomeHandler).Methods("GET")
	r.HandleFunc("/api/links", handlers.GetLinksHandler(linksCollection)).Methods("GET")
	r.HandleFunc("/api/links", handlers.CreateLinkHandler(linksCollection)).Methods("POST")
	r.HandleFunc("/api/links/{id}", handlers.UpdateLinkHandler(linksCollection)).Methods("PATCH")
	r.HandleFunc("/api/links/{id}", handlers.GetLinkHandler(linksCollection)).Methods("GET")

	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
