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
app.use('/api/auth-postulantes', require('./routes/auth/auth-postulantes'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/auth-empresas', require('./routes/auth/auth-empresas'));
app.use('/api/auth', require('./routes/email'));
app.use('/api/perfiles', require('./routes/extra-postulantes/perfiles'));
app.use('/api/experiencias-laborales', require('./routes/extra-postulantes/experiencias_laborales'));
app.use('/api/experiencias-academicas', require('./routes/extra-postulantes/experiencias_academicas'));
app.use('/api/habilidades', require('./routes/extra-postulantes/habilidades'));
app.use('/api/valores', require('./routes/extra-postulantes/valores'));
app.use('/api/idiomas', require('./routes/extra-postulantes/idiomas'));
//Se asigna el puerto para la escucha del servidor 
app.listen(process.env.PORT);