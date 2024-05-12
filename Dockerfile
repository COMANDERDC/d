#Budowanie aplikacji Node.js
FROM node:14 AS build

#Ustawienie katalogu roboczego
WORKDIR /app

#Skopiowanie plików aplikacji
COPY package.json ./

RUN npm install

#Skopiowanie kodu źródłowego
COPY server.js ./

#Budowanie aplikacji
RUN npm run build

#Uruchomienie aplikacji w kontenerze
FROM node:14-slim

#Ustawienie katalogu roboczego
WORKDIR /app

#Skopiowanie plików aplikacji z poprzedniego etapu
COPY --from=build /app .

#Uruchomienie serwera
CMD ["node","server.js"]

#Informacja o autorze pliku Dockerfile
LABEL author="Jakub Smyrski"

#HEALTCHECK
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl --fail http://localhost:${PORT}/ || exit 1
