//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { getEmail, getJWT_ID, generateJWT, generateTokenRefreshToken, getRefreshToken } = require('../helpers/jwt');
//Se requiere la funcion para enviar el email
const { enviarEmail } = require('../helpers/email');
//Se requiere de la dependencia bcryptjs y la almacenamos en una constante
const bcrypt = require('bcryptjs');

//Funcion para logearse si eres postulante
const loginPostulante = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!postulante[0][0]) {
        return res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    }

    //Se compara el password que se manda a traves de la peticion con el password del postulante 
    const validPassword = bcrypt.compareSync(pass, postulante[0][0].pass);

    //Si la comparacion de las contraseñas es falsa
    if (!validPassword) {
        return res.json({
            status: false,
            message: 'Password incorrecto',
            data: null
        });
    }

    //Se guarda en una constante el email del postulante
    const emailP = postulante[0][0].email;
    //Generamos los tokens del postulante
    const tokens = await generateTokenRefreshToken(emailP);

    //Retornamos la informacion del postulante con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: postulante[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });
}

//Funcion para registrarte como postulante
const registerPostulante = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        email,
        pass
    } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);

    //Si el email existe en la BD
    if (postulante[0][0]) {
        return res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        })
    }

    //Se generan unos bits aleatorios para la encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    //Se encripta la contraseña 
    const passwordEncrypt = bcrypt.hashSync(pass, salt);
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        email,
        passwordEncrypt
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_add_postulante(?, ?, ?, ?, ?, ?, ?)', mysqlParams);

    //Si los renglones afectados de la BD son iguales a cero
    if (result.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al crear la cuenta',
            data: result.affectedRows
        });
    }

    res.json({
        status: true,
        message: 'Cuenta registrada de manera exitosa',
        data: result.affectedRows
    });

    //Generamos los tokens del postulante
    const tokens = await generateJWT(email);

    //Enviamos el email al correo del postulante
    enviarEmail(email, tokens.token, 1);
}

//Funcion para actualizar la contraseña del postulante
const renewPass = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mySqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mySqlParam);

    //Si el email no existe en la BD
    if (!postulante[0][0]) {
        return res.json({
            status: false,
            message: 'Este email no a sido registrado aun',
            data: null
        });
    }

    //Se compara el password que se manda por la peticio  con el password del postulante 
    const validpassword = bcrypt.compareSync(pass, postulante[0][0].pass);

    //Si la comparacion de las contraseñas es igual
    if (validpassword) {
        return res.json({
            status: false,
            message: 'No puedes actualizar la contraseña por la misma contraseña',
            data: null
        });
    }

    //Se generan unos bits aleatorios para la encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    //Se encripta la contraseña 
    const passwordEncryption = bcrypt.hashSync(pass, salt);
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        email,
        passwordEncryption
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_renewpass_postulante(?, ?)', mysqlParams);

    //Si los renglones afectados de la BD son iguales a cero
    if (result.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la contraseña',
            data: result.affectedRows
        });
    }

    res.json({
        status: true,
        message: 'Contraseña actualizada correctamente',
        data: result.affectedRows
    });
}

//Funcion para renovar el Token
const renewToken = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion 
    const token = req.header('x-token');
    //Generamos el email del postulante con la funcion getEmail
    const email = getEmail(token);
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!postulante[0][0]) {
        return res.json({
            status: false,
            message: 'No hay registro de un usario con ese email',
            data: null
        });
    }

    //Generamos los tokens del postulante
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion del postulante con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: postulante[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });
}

//Funcion para renovar el Token con el RefreshToken
const renewRefreshtoken = async(req, res) => {
    //Se crean dos constantes que seran igual a los header que tiene la peticion 
    const token = req.header('x-token');
    const id_token = req.header('r-token');
    //Generemos el id del token con la funcion getJWT_ID
    const jwt_id = getJWT_ID(token);
    //Generamos el refreshToken con la funcion getRefreshToken
    const refreshToken = await getRefreshToken(jwt_id, id_token);
    //Guardamos el email del refreshToken
    const email = refreshToken.email;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!postulante[0][0]) {
        return res.json({
            status: false,
            message: 'No hay registro de un usario con ese email',
            data: null
        });
    }

    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParamT = [id_token];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_update_token(?)', mysqlParamT);

    //Si los renglones afectados de la BD son iguales a cero
    if (result.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'No se pudo generar el token',
            data: result.affectedRows
        });
    }

    //Generamos los tokens del postulante
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion del postulante con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: postulante[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });
}

const validEmail = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion 
    const token = req.header('x-token');
    //Generamos el email del postulante con la funcion getEmail
    const email = getEmail(token);
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParams = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_validaremail_postulante(?)', mysqlParams);

    //Si el email no existe en la BD
    if (!postulante[0][0]) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al validar el email',
            data: null
        });
    }

    //Generamos los tokens del postulante
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion del postulante con sus tokens
    res.json({
        status: true,
        message: 'Email validado correctamente',
        data: postulante[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });
}

//Exportamos las funciones para utilizar en nuestros endpoints
module.exports = {
    loginPostulante,
    registerPostulante,
    renewPass,
    renewToken,
    renewRefreshtoken,
    validEmail
};