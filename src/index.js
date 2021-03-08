//Se requiere la dependencia dotenv para hacer uso de variables de entorno desde .env
require('dotenv').config();
//Se requiere el uso del framework express para manejo de peticiones HTTP
const express = require('express');
//Se requiere el uso de cors 
const cors = require('cors');
//Se crea la aplicacion de tipo express que tendra los metodos HTTP
const app = express();

//Se permite el acceso externo a las rutas del servidor
app.use(
    cors({
        origin: true,
    })
);

//Se usa en la aplicacion la funcion .json() de express para analizar las solicitudes en formato JSON
app.use(express.json());

//Se asignan las diferentes rutas que tendra la aplicacion que vienen de los archivos de rutas
app.use('/api/postulantes', require('./routes/postulantes'));
app.use('/api/auth-postulantes', require('./routes/auth-postulantes'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/auth-empresas', require('./routes/auth-empresas'));
app.use('/api/auth', require('./routes/email'));
app.use('/api/perfiles', require('./routes/perfiles'));
app.use('/api/experiencias-laborales', require('./routes/experiencias_laborales'));
//Se asigna el puerto para la escucha del servidor 
app.listen(process.env.PORT);