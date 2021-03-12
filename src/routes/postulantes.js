//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de los postulantes del archivo postulantes.js
const { getPostulantes, getPostulante, updatePostulante, deletePostulante, validPerfilCompletoPostulante, updateFotoPostulante } = require('../bml/controllers/postulantes');
//Se requiere el uso de check de express-validator
const { check } = require('express-validator');
//Se requiere la funcion validFields del archivo validar-campos.js
const { validFields } = require('../bml/middlewares/validar-campos');
//Se requiere la funcion para validar el refreshToken y el token
const { validJWT } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

//Ruta para obtner el perfil completo de un postulante
router.get('/perfil-completo/:id',
    //Se valida el token,
    validJWT,
    //Se manda a llamar la funcion para obtener al postulante
    getPostulante
);

//Ruta para saber si el perfil esta completo
router.get('/valid-perfil-completo',
    //Se valida el token,
    validJWT,
    //Se manda a llamar la funcion para saber si el perfil esta completo
    validPerfilCompletoPostulante
);

//Ruta para completar y actualizar el perfil del usuario
router.put('/update', [
    validJWT,
    //Se valida cada uno de los parametros para actualizar al postulante
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido_paterno', 'El apellido paterno es obligatorio').notEmpty(),
    check('apellido_materno', 'El apellido materno es obligatorio').notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').isDate(),
    check('sexo', 'El sexo es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para actualizar al postulante
], updatePostulante);

router.put('/update-foto', [
    validJWT,
    //Se valida cada uno de los parametros para actualizar al postulante
    check('foto_perfil', 'La foto es oligatoria').notEmpty(),
    validFields
], updateFotoPostulante)

//Rutas de nuestros postulantes
router.get('/', validJWT, getPostulantes);
router.delete('/:id', deletePostulante);


//Exportamos el router
module.exports = router;