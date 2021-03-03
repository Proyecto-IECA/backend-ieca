//Se implementan las dependencias necesarias
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const moment = require('moment');
//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');

//Funcion que recibe un id para retornar un una promesa un jsonwebtoken junto con su id
const generateJWT = (email) => {
    return new Promise((resolve, reject) => {
        //Se declara una constante que sera el contenido para el jsonwebtoken
        const payload = { email };
        //Se genera un uuid que sera el id del jsonwebtoken almacenado en una constante
        const jwt_id = uuid.v4();

        /*Se genera el jsonwetoken con el conetenido, una clave para la encriptacion, el
        tiempo de expiracion y su id para identificarlo*/
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
            jwtid: jwt_id
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
                throw new Error(err);
            } else {
                resolve({ token, jwt_id });
            }
        });
    });
}

//Funcion que recibe un id para retornar un una promesa un jsonwebtoken junto con su id
const generateJWTEmail = (email) => {
    return new Promise((resolve, reject) => {
        //Se declara una constante que sera el contenido para el jsonwebtoken
        const payload = { email };
        //Se genera un uuid que sera el id del jsonwebtoken almacenado en una constante
        const jwt_id = uuid.v4();

        /*Se genera el jsonwetoken con el conetenido, una clave para la encriptacion, el
        tiempo de expiracion y su id para identificarlo*/
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '10 minutes',
            jwtid: jwt_id
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
                throw new Error(err);
            } else {
                resolve({ token, jwt_id });
            }
        });
    });
}

//Funcion para generar un Token y un RefreshToken con un email
const generateTokenRefreshToken = async(email) => {
    //Generemos un jsonwebtoken con ayuda de la funcion generateJWT
    const generateToken = await generateJWT(email);
    //En una constante guardamos el token que nos retorno la funcion anterior
    const token = generateToken.token;
    //En otra constante guardamos el id del token que se retorno de la funcion anterior
    const jwt_id = generateToken.jwt_id;
    //Se genera una fecha con ayuda de la libreria moment a 10 dias posterior del dia actual
    const fecha_expiracion = moment().add(10, 'd').toDate();
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParamsT = [
        jwt_id,
        fecha_expiracion,
        email
    ];

    //Insertamos el refreshToken en la BD y lo guardamos en una constante
    const generateRToken = await queryParams('stp_add_token(?, ?, ?)', mysqlParamsT);

    //Pasamos a formato de cadena el refreshToken con ayuda de la libreria uuid
    const refreshToken = uuid.stringify(generateRToken[0][0].id_token);

    //Retornamos el token y refreshToken
    return { token, refreshToken }
}

//Funcion para obtener el id del jsonwebtoken
const getJWT_ID = (token) => {
    //Validamos el token y obtenemos su payload
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true
    });
    //Guardamos en una constante el id
    const jwt_id = payload.jti;
    //Lo retornamos
    return jwt_id;
}

//Funcion para obtener el email del token
const getEmail = (token) => {
    //Validamos el token y obtenemos su payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //Guardamos en una constante el id
    const email = payload.email;
    //Lo retornamos
    return email;
}

//Funcion para obtener el refreshToken de la BD
const getRefreshToken = async(jwt_id, id_token) => {
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_token,
        jwt_id
    ];
    try {
        //En una constante guardamos la respuesta de la ejecucion del procedimiento
        const rToken = await queryParams('stp_getbyid_token(?,?)', mysqlParams);
        //Si el primer objeto de nuestra respuesta tiene algo
        if (rToken[0][0]) {
            //Retornamos ese primer objeto
            return rToken[0][0];
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }

}

//Funcion para validar que el refreshToken no halla expirado
const expiredRefreshToken = (rToken) => {
    //Se compara si la fecha de hoy es despues a la fecha de expiracion del refreshToken
    if (moment().isAfter(rToken.fecha_expiracion)) return true;

    return false;
}

//Exportamos las funciones
module.exports = {
    generateJWT,
    generateJWTEmail,
    generateTokenRefreshToken,
    getJWT_ID,
    getEmail,
    getRefreshToken,
    expiredRefreshToken
}