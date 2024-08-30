package handlers

import (
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
	"time"
	"url-shortener/backend/db"
	"url-shortener/backend/models"
)

func AdminSpaHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "dist/admin/index.html")
}

func CreateLinkHandler(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var link models.Link
		err := json.NewDecoder(r.Body).Decode(&link)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		link.CreatedAt = time.Now()

		result, createError := db.CreateLink(ctx, collection, link)
		if createError != nil {
			http.Error(w, createError.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		encodeError := json.NewEncoder(w).Encode(result)
		if encodeError != nil {
			http.Error(w, encodeError.Error(), http.StatusInternalServerError)
		}
	}
}

func GetLinkHandler(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		vars := mux.Vars(r)
		id := vars["id"]

		link, err := db.GetLink(ctx, collection, id)
		if err != nil {
			if err.Error() == "link not found" {
				http.Error(w, err.Error(), http.StatusNotFound)
			} else {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
			return
		}

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(link)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func GetLinksHandler(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		links, err := db.GetLinks(ctx, collection)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(links)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./dist/index.html")
}

func RedirectHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Redirect", r.URL.Path)

	url := "http://hirehart.com"
	http.Redirect(w, r, url, http.StatusMovedPermanently)
}

func UpdateLinkHandler(collection *mongo.Collection) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		vars := mux.Vars(r)
		id := vars["id"]

		var payload bson.M
		err := json.NewDecoder(r.Body).Decode(&payload)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err = db.UpdateLink(ctx, collection, id, payload)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}
