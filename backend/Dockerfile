# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .


# Expone el puerto de la aplicación
EXPOSE 3001

# Inicia la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]