package dbutils

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() (*mongo.Client, error) {
	uri := os.Getenv("MONGO_URI")
	username := os.Getenv("MONGO_ADMIN_USERNAME")
	password := os.Getenv("MONGO_ADMIN_PASSWORD")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(uri).SetAuth(options.Credential{
		Username: username,
		Password: password,
	})

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		return nil, fmt.Errorf("Could not connect to Mongo: %v", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("Could not ping Mongo: %v", err)
	}

	log.Println("Connected to Mongo")
	return client, nil
}
