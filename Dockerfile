FROM golang:1.23 as backend

WORKDIR /app

# Later: COPY backend/go.mod backend/go.sum ./
COPY backend/go.mod ./
RUN go mod download

COPY backend/. .
RUN go build -o main .

COPY ./frontend/index.html /app/frontend/index.html
EXPOSE 8080
CMD ["./main"]
