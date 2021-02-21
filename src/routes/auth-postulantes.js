//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de auth-postulantes del archivo auth-postulantes.js
const { loginPostulante, renewPass, validEmail, registerPostulante } = require('../bml/controllers/auth-postulantes');
//Se requiere el uso de check de express-validator
const { check } = require('express-validator');
//Se requiere la funcion validFields del archivo validar-campos.js
const { validFields } = require('../bml/middlewares/validar-campos');

//Se crea una constante del tipo router
const router = Router();

//Ruta de login de postulante
router.post('/login', [
    //Se valida cada uno de los parametros para iniciar sesion
    check('email', 'El email es oligatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para iniciar sesion
], loginPostulante);

//Ruta de registro de postulante
router.post('/register', [
    //Se valida cada uno de los parametros para registrar al postulante
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido_paterno', 'El apellido paterno es obligatorio').notEmpty(),
    check('apellido_materno', 'El apellido materno es obligatorio').notEmpty(),
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatorio').isDate(),
    check('sexo', 'El sexo es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para registrar al postulante
], registerPostulante);

//Ruta para renovar el password del postulante
router.put('/renewpass', [
    //Se valida cada uno de los parametros para actualizar el password del postulante
    check('email', 'El email es obligatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para renovar el password del postulante
], renewPass);

router.put('/validemail', validEmail);

//Exportamos el router
module.exports = router;