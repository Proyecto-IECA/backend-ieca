//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de auth-empresas del archivo auth-postulantes.js
const { loginEmpresa, renewPass, renewToken, renewRefreshtoken, validEmail, registerEmpresas } = require('../bml/controllers/auth-empresas');
//Se requiere el uso de check de express-validator
const { check } = require('express-validator');
//Se requiere la funcion validFields del archivo validar-campos.js
const { validFields } = require('../bml/middlewares/validar-campos');
//Se requiere la funcion para validar el refreshToken
const { validRefreshToken, validJWT, validJWTRegister } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

//Ruta de login de empresa
router.post('/login', [
    //Se valida cada uno de los parametros para iniciare sesion 
    check('email', 'El email es obliogatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar pasar la peticion
    validFields
    //Se manda llamar la funcion para iniciar sesion
], loginEmpresa);

//Ruta registro de empresa
router.post('/register', [
    //Se valida cada uno de los parametros para registrar la empresa
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('administrador', 'El nombre del administrador es obligatorio').notEmpty(),
    check('ubicacion', 'La ubicacion de la empresa es obligatoria').notEmpty(),
    check('giro', 'El giro de la empresa es la misma').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se manda llamar la funcion para registrar la empresa
], registerEmpresas);

//Ruta para renovar el password de la empresa
router.put('/renew-pass', [
    validJWTRegister,
    //Se valida cada uno de los parametros para actualizar el password del postulante 
    check('email', 'El email es obliogatorio').isEmail(),
    check('pass', 'El password es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar pasar la peticion
    validFields
    //Se manda llamar la funcion para renovar el password
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

//Ruta para validar el email
router.get('/valid-email',
    //Se valida el token
    validJWTRegister,
    //Se manda a llamar la funcion para validar el email
    validEmail
);

//Exportamos el router
module.exports = router;