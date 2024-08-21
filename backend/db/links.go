package db

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"url-shortener/backend/models"
)

func CreateLink(ctx context.Context, collection *mongo.Collection, link models.Link) (*mongo.InsertOneResult, error) {
	result, err := collection.InsertOne(ctx, link)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func GetLink(ctx context.Context, collection *mongo.Collection, id string) (models.Link, error) {
	var link models.Link
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return link, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&link)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return link, errors.New("link not found")
		}
		return link, err
	}

	return link, err
}

func GetLinks(ctx context.Context, collection *mongo.Collection) ([]models.Link, error) {
	var links []models.Link
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &links); err != nil {
		return nil, err
	}

	if links == nil {
		return []models.Link{}, nil
	}

	return links, nil
}

func UpdateLink(ctx context.Context, collection *mongo.Collection, id string, update bson.M) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": update})
	return err
}
