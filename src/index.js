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

//Rutas de Auth
app.use('/api/auth-postulantes', require('./routes/auth/auth-postulantes'));
app.use('/api/auth-empresas', require('./routes/auth/auth-empresas'));
app.use('/api/auth', require('./routes/email'));

//Rutas de Postulante
app.use('/api/postulantes', require('./routes/postulantes'));
app.use('/api/perfiles', require('./routes/extra-postulantes/perfiles'));
app.use('/api/experiencias-laborales', require('./routes/extra-postulantes/experiencias_laborales'));
app.use('/api/experiencias-academicas', require('./routes/extra-postulantes/experiencias_academicas'));
app.use('/api/cursos-certificaciones', require('./routes/extra-postulantes/cursos-certificacion'));
app.use('/api/habilidades', require('./routes/extra-postulantes/habilidades'));
app.use('/api/valores', require('./routes/extra-postulantes/valores'));
app.use('/api/idiomas', require('./routes/extra-postulantes/idiomas'));

//Rutas de Empresa
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/vacantes', require('./routes/extra-empresas/vacantes'));
app.use('/api/sucursales', require('./routes/extra-empresas/sucursales_empresa'));
app.use('/api/vistas-vacante', require('./routes/extra-empresas/vistas_vacante'));

//Se asigna el puerto para la escucha del servidor 
app.listen(process.env.PORT);