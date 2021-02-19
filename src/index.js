//Se requiere la dependencia dotenv para hacer uso de variables de entorno desde .env
require('dotenv').config();
//Se requiere el uso del framework express para manejo de peticiones HTTP
const express = require('express');
//Se crea la aplicacion de tipo express que tendra los metodos HTTP
const app = express();

//Se usa en la aplicacion la funcion .json() de express para analizar las solicitudes en formato JSON
app.use(express.json());

//Se asignan las diferentes rutas que tendra la aplicacion que vienen de los archivos de rutas
app.use('/api/postulantes', require('./routes/postulantes'));
app.use('/api/auth-postulantes', require('./routes/auth-postulantes'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/auth-empresas', require('./routes/auth-empresas'));

//Se asigna el puerto para la escucha del servidor 
app.listen(process.env.PORT);