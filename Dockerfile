
# FRONTEND
FROM node:20-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --force
COPY frontend/ ./
RUN npm run build

# BACKEND
FROM golang:1.23 AS backend
WORKDIR /app

# Later: COPY backend/go.mod backend/go.sum ./
COPY backend/go.mod ./
RUN go mod download

COPY backend/. .
COPY --from=frontend /app/frontend .
RUN go build -o main .

#COPY ./frontend/index.html /app/frontend/index.html
EXPOSE 8080
CMD ["./main"]
