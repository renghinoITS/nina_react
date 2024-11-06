# Usa un'immagine Node come base per l'ambiente di build
FROM node:18-alpine AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente nell'immagine
COPY . .

# Costruisci l'app usando Vite
RUN npm run build

# Usa Nginx per servire l'applicazione
FROM nginx:alpine

# Copia i file costruiti dalla fase precedente alla cartella di Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia la configurazione personalizzata di Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Espone la porta 80
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
