# Evaluación 2

El taller 1 fue desarrollada en:
- Frontend: Svelte
- Backend: Express - Node JS
- Base de datos: MongoDB

## Requisitos Previos

Asegúrate de tener instalado Node.js en tu máquina

## Frontend

1. **Ingresa al directorio 'Frontend/client'**

```bash
cd Frontend
cd client
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno creando un archivo .env en el directorio client y proporciona el valor necesario que es la url en donde se corre el servidor:**
- VITE_BASE_API_URL = ""

4. **Inicia la aplicación**

```bash
npm run dev
```

## Base de datos

1. **Regístrate en MongoDB Atlas:**

   - Dirígete a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Inicia sesión o sigue el proceso de registro para crear una cuenta.

2. **Crea un Proyecto:**

   - Después de iniciar sesión, crea un nuevo proyecto desde el dashboard.
   - Selecciona el proyecto recién creado.

3. **Crea un Cluster:**

   - En el dashboard del proyecto, haz clic en "Build a Cluster".
   - Selecciona las opciones deseadas para tu cluster y haz clic en "Create Cluster".

4. **Conexión:**

   - En el dashboard del proyecto, haz clic en "Clusters" en el menú de la izquierda.
   - Haz clic en el botón "Connect" para tu cluster.
   - Selecciona "Connect your application" y copia la cadena de conexión y luego ponla en la variable de entorno del backend: 'MONGO_URL'.

## Backend

1. **Ingresa al directorio 'Backend'**

```bash
cd Backend
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno creando un archivo .env en el directorio backend y proporciona los valores necesarios que son:**
 
- PORT = ""
- MONGO_URL = ""
- JWT_SECRET= "Jaqamain3pals"

4. **Inicia la aplicación**

```bash
npx nodemon
```
