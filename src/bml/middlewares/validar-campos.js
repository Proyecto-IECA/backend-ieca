//Se requiere del fremawork express
const { response } = require("express");
//Se requiere del middleware express-validator
const { validationResult } = require("express-validator");

//Funcion para validar los campos de una peticion antes de ejecutarla
const validFields = (req, res = response, next) => {
    //Guardamos en una constante los errores que se pueden generar
    const errors = validationResult(req);

    //Se verifica si hay al menos un error
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: "Error en la validacion de los campos",
            data: errors.array(),
        });
    }
    //Si no hay ningun error se puede ejecutar la peticion
    next();
};

//Se exporta la funcion para utilizar en nuestras rutas
module.exports = {
    validFields
};