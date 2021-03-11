//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de auth-postulantes del archivo auth-postulantes.js
const { loginPostulante, renewPass, renewToken, renewRefreshtoken, validEmail, registerPostulante } = require('../../bml/controllers/auth/auth-postulantes');
//Se requiere el uso de check de express-validator
const { check } = require('express-validator');
//Se requiere la funcion validFields del archivo validar-campos.js
const { validFields } = require('../../bml/middlewares/validar-campos');
//Se requiere la funcion para validar el refreshToken y el token
const { validRefreshToken, validJWT, validJWTRegister } = require('../../bml/middlewares/validar-jwt');

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
    check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').isDate(),
    check('sexo', 'El sexo es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para registrar al postulante
], registerPostulante);

//Ruta para renovar el password del postulante
router.put('/renew-pass', [
    validJWTRegister,
    //Se valida cada uno de los parametros para actualizar el password del postulante
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields,
    //Se manda llamar la funcion para renovar el password del postulante
], renewPass);

//Ruta para renovar el token
router.get('/renew-token',
    //Se valida el token
    validJWT,
    //Se manda a llamar la funcion para renovar el token
    renewToken
);

//Ruta para renovar el token con el refreshToken
router.get('/renew-refreshtoken',
    //Se valida el refreshToken    
    validRefreshToken,
    //Se manda a llamar la funcion para renovar el token
    renewRefreshtoken
);

router.get('/valid-email',
    //Se valida el token
    validJWTRegister,
    //Se manda a llamar la funcion para validar el email
    validEmail
);


//Exportamos el router
module.exports = router;