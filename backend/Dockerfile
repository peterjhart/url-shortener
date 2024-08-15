FROM golang:1.23

WORKDIR /app

# Later: COPY go.mod go.sum ./
COPY go.mod ./
RUN go mod download

COPY . .
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]
