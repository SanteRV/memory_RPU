# Dockerfile para el backend
FROM node:18-alpine

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código del servidor
COPY . .

# Crear carpeta uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3003

# Iniciar servidor
CMD ["node", "server.js"]
