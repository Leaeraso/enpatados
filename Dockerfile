# Usamos la imagen base node:22-alpine
FROM node:22-alpine

# Creamos y establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto en un solo paso
# Esto asegurará que las dependencias, incluido bcrypt, se compilen para Alpine
RUN npm install --production
RUN npm install --only=dev

# Copiamos el resto del código fuente
COPY . .

# Instalamos TypeScript globalmente si no está presente
RUN npm install typescript --save-dev

# Compilamos el proyecto TypeScript a JavaScript
RUN npx tsc

# Exponemos el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Definimos una variable de entorno que usa la configuración de .env
# Descomentar para el desarrollo
#ENV NODE_ENV=production

# Configuramos las variables de entorno
# Asegúrate de que el archivo .env esté en el mismo directorio que el Dockerfile
# Para desarrollo tener un .env y descomentar la linea de abajo
# COPY .env .env

# Ejecutamos el comando para iniciar la aplicación
CMD ["npm", "start"]