# =========================
# STAGE 1: Build React frontend
# =========================
FROM node:18-alpine AS frontend-build

# Ustaw katalog roboczy dla frontu
WORKDIR /app/client

# Skopiuj pliki package.json z frontendu
COPY client/package*.json ./

# Zainstaluj zależności frontendu
RUN npm install

# Skopiuj resztę kodu frontendu
COPY client/ ./

# Zbuduj produkcyjny bundle Reacta
RUN npm run build


# =========================
# STAGE 2: Backend + statyczny frontend
# =========================
FROM node:18-alpine AS backend

# Katalog roboczy dla backendu
WORKDIR /app

# Skopiuj pliki package.json backendu
COPY server/package*.json ./server/

# Zainstaluj zależności backendu
WORKDIR /app/server
RUN npm install

# Skopiuj cały kod backendu
COPY server/ ./

# Skopiuj zbudowany frontend z pierwszego stage
# Zakładamy, że Express będzie serwował pliki z ./public lub ./build
# Jeśli w backendzie używasz np. app.use(express.static("client_build")),
# zmień ścieżkę odpowiednio.
COPY --from=frontend-build /app/client/build ./client_build

# Ustaw zmienną środowiskową NODE_ENV
ENV NODE_ENV=production

# Wystaw port (dopasuj do tego, co słucha Express – np. 8080)
EXPOSE 8080

# Komenda startowa – dopasuj do package.json backendu
# np. "start": "node index.js" albo "node server.js"
CMD ["npm", "start"]
