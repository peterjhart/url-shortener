package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Link struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	URL       string             `bson:"url" json:"url"`
	Alias     string             `bson:"alias" json:"alias"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
}
