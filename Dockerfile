
# FRONTEND
FROM node:20-slim AS frontend
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN --mount=type=cache,id=npm,target=/root/.npm npm ci --force
COPY frontend/ ./
RUN npm run build

# BACKEND
FROM golang:1.23 AS backend
WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/. .
RUN go build -o main .

# FINAL
FROM golang:1.23 AS final
WORKDIR /app
COPY --from=backend /app/main .
COPY --from=frontend /app/dist ./dist

EXPOSE 8080

CMD ["./main"]
