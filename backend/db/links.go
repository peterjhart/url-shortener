package db

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"url-shortener/backend/models"
)

func CreateLink(collection *mongo.Collection, link models.Link) (*mongo.InsertOneResult, error) {
	return nil, nil
}

func GetLink(collection *mongo.Collection, id string) (models.Link, error) {
	return models.Link{}, nil
}

func GetLinks(collection *mongo.Collection) ([]models.Link, error) {
	return nil, nil
}

func UpdateLink(collection *mongo.Collection, id string, update bson.M) error {
	return nil
}
