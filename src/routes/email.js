//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requiere la funcion de sendEmailValidadPassword del archivo email
const { sendEmailValidPassword, sendEmailValidEmail } = require('../bml/controllers/email');
//Se requiere el uso de check de express-validator
const { check } = require('express-validator');
//Se requiere la funcion validFields del archivo validar-campos.js
const { validFields } = require('../bml/middlewares/validar-campos');

//Se crea una constante del tipo router
const router = Router();

//Ruta para enviar un email de validar password
router.post('/send-email-password', [
    //Se valida el parametro para enviar un emain
    check('email', 'El email es obligatorio').isEmail(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se mansa a llamar la funcion para enviar el email
], sendEmailValidPassword);

router.post('/send-email-valid-email', [
    //Se valida el parametro para enviar un emain
    check('email', 'El email es obligatorio').isEmail(),
    check('tipo', 'El tipo es obligatorio').notEmpty(),
    //Se utiliza la funcion para validar los campos para dejar o no pasar la peticion
    validFields
    //Se mansa a llamar la funcion para enviar el email
], sendEmailValidEmail);

//Exportamos el router
module.exports = router;