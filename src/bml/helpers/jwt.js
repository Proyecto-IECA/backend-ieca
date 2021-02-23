//Se requiere la dependencia de jsonwebtoken y la almacenamos en una constante
const jwt = require('jsonwebtoken');
//Se requiere de la dependencia uuid y la almacenamos en una constante
const uuid = require('uuid');
//Se requiere de la dependencia moment y la almacenamos en una constante
const moment = require('moment');
//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');

//Funcion que recibe un id para retornar un una promesa un jsonwebtoken junto con su id
const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        //Se declara una constante que sera el contenido para el jsonwebtoken
        const payload = { id };
        //Se genera un uuid que sera el id del jsonwebtoken almacenado en una constante
        const jwt_id = uuid.v4();

        /*Se genera el jsonwetoken con el conetenido, una clave para la encriptacion, el
        tiempo de expiracion y su id para identificarlo*/
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '120000',
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

/*Funcion que recibe un id y el tipo para generar un refreshToken ya sea de postulante o empresa 
y retornar este junto con el jsonwebtoken*/
const generateTokenRefreshToken = async(id, tipo) => {
    //Se manda llamar el metodo para generar el jsonwebtoken y pasamos el id
    const generateToken = await generateJWT(id);
    //En una constante guardamos el token que nos retorno la funcion anterior
    const token = generateToken.token;
    //En otra constante guardamos el id del token que se retorno de la funcion anterior
    const jwt_id = generateToken.jwt_id;
    //Se genera una fecha con ayuda de la libreria moment a 10 dias posterior del dia actual
    const fecha_expiracion = moment().add(10, 'd').toDate();
    /*Se crea una constante con los parametros para ejecutar el procedimiento almacenado para 
    guardar el refreshToken en la BD*/
    const mysqlParamsT = [
        jwt_id,
        fecha_expiracion,
        id
    ];

    //Declaramos una variable sin inicializar
    let generateRToken;

    /*Dependiendo del tipo que se manda se ejecutara la llamada al metodo queryParams para ejecutar
    el procedimiento almacenado con los parametros necesarios, el tipo 1 es para el postulante y algun
    otro tipo seria para la empresa*/
    if (tipo == 1)  {
        generateRToken = await queryParams('stp_add_token_postulante(?, ?, ?)', mysqlParamsT);
    } else {
        generateRToken = await queryParams('stp_add_token_empresa(?, ?, ?)', mysqlParamsT);
    }

    /*Guardamos en una constante el refreshToken devuelto de la ejecucion del procedimiento almacenado,
    ya sea el de postulante o empresa, a este se le aplica un metodo de la libreria uuid para mostrar
    en formato de cadena el refreshToken*/
    const refreshToken = uuid.stringify(generateRToken[0][0].id_token);

    return { token, refreshToken }
}

const getRefreshToken = async(jwt_id, id_token) => {
    const mysqlParams = [
        id_token,
        jwt_id
    ];
    try {
        const rToken = await queryParams('stp_getbyid_token(?,?)', mysqlParams);
        if (rToken[0][0]) {
            return rToken[0][0];
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }

}

const expiredRefreshToken = (rToken) => {
    if (moment().isAfter(rToken.fecha_expiracion)) return true;

    return false;
}

//Exportamos la funcion que devolvera nuestro token y refreshToken
module.exports = {
    generateTokenRefreshToken,
    getRefreshToken,
    expiredRefreshToken
}