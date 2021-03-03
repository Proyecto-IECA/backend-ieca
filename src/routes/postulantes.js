//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de los postulantes del archivo postulantes.js
const { getPostulantes, getPostulante, updatePostulante, deletePostulante } = require('../bml/controllers/postulantes');
//Se requiere la funcion para validar el refreshToken y el token
const { validJWT } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

//Ruta para obtner el perfil completo de un postulante
router.get('/:id',
    //Se valida el token,
    validJWT,
    //Se manda a llamar la funcion para obtener al postulante
    getPostulante
);

//Rutas de nuestros postulantes
router.get('/', validJWT, getPostulantes);
router.put('/:id', updatePostulante);
router.delete('/:id', deletePostulante);

//Exportamos el router
module.exports = router;