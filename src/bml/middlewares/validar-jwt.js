//Se implementan las dependencias necesarias
const jwt = require('jsonwebtoken');
//Se implementan las funciones necesarias del archivo jwt.js
const { getJWT_ID, getRefreshToken, expiredRefreshToken } = require('../helpers/jwt')

//Funcion para validar el token antes de ejecutar las peticiones HTTP
const validJWT = async(req, res, next) => {
    //Se crea una constante que sera igual al token que se manda por el header de la peticion
    const token = req.header('x-token');
    //Si el token esta vacio
    if (!token) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token',
            data: null
        });
    }
    try {
        //En una constante se guarda el resultado de validar el token
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        //Se iguala el id del enpoint con el de la validacion
        req.id = id;
        //Se deja pasar la peticion
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token invalido',
            data: null
        });
    }
}

//Funcion para validar el refreshToken antes de ejecutar las peticiones HTTP
const validRefreshToken = async(req, res, next) => {
    //Se crean dos constantes que seran igual a los header que tiene la peticion 
    const token = req.header('x-token');
    const rToken = req.header('r-token');

    //Si el token y refrehToken estan vacios
    if (!token & !rToken) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token y refreshToken',
            data: null
        });
    }

    //Si el token esta vacio
    if (!token) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token',
            data: null
        });
    }

    //Si el refreshToken esta vacio
    if (!rToken) {
        return res.json({
            status: false,
            message: 'La peticion no tiene refreshToken',
            data: null
        });
    }

    try {
        //Generemos el id del token con la funcion getJWT_ID
        const jwt_id = getJWT_ID(token);
        //Generamos el refreshToken con la funcion getRefreshToken
        const refreshToken = await getRefreshToken(jwt_id, rToken);
        //Guardamos el valor que nos retorna la funcion expiredRefreshToken
        const expired = expiredRefreshToken(refreshToken);
        //Si el resfrehToken expiro
        if (expired) {
            return res.json({
                status: false,
                message: 'RefreshToken expirado',
                data: null
            });
        }
        //Se deja pasar la peticion
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'RefreshToken invalido',
            data: null
        });
    }
}

//Se exporta la funcion para validar el token
module.exports = {
    validJWT,
    validRefreshToken
}