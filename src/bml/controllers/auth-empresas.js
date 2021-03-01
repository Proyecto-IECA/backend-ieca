//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { getEmail, getJWT_ID, generateJWT, generateTokenRefreshToken, getRefreshToken } = require('../helpers/jwt');
//Se requiere la funcion para enviar el email
const { enviarEmail } = require('../helpers/email');
//Se requiere de la dependencia bcryptjs y la almacenamos en una constante
const bcrypt = require('bcryptjs');

//Funcion para logearse si eres empresa
const loginEmpresa = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParams = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParams);

    //Si el email no existe en la BD
    if (!empresa[0][0]) {
        res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    }

    //Se compara el password que se manda por el endpoint con el password de la empresa
    const validPassword = bcrypt.compareSync(pass, empresa[0][0].pass);

    //Si la comparacion de las contraseñas es falsa
    if (!validPassword) {
        return res.json({
            status: false,
            message: 'Password incorrecto',
            data: null
        });
    }

    //Se guarda en una constante el email de la empresa
    const emailE = empresa[0][0].email;
    //Generamos los tokens de la empresa
    const tokens = await generateTokenRefreshToken(emailE);

    //Retornamos la informacion de la empresa con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: empresa[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });


}

//Funcion para registrarte como empresa
const registerEmpresas = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const {
        nombre,
        administrador,
        ubicacion,
        giro,
        email,
        pass
    } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado        
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);

    //Si el email existe en la BD
    if (empresa[0][0]) {
        return res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        });
    }

    //Se generan unos bits aleatorios para la encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    //Se encripta la contraseña 
    const passwordEncrypt = bcrypt.hashSync(pass, salt);
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        nombre,
        administrador,
        ubicacion,
        giro,
        email,
        passwordEncrypt
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_add_empresa(?, ?, ?, ?, ?, ?)', mysqlParams);

    //Si los renglones afectados de la BD son iguales a cero
    if (result.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al crear la cuenta',
            data: null
        });
    }

    res.json({
        status: true,
        message: 'Cuenta registrada de manera exitosa',
        data: result.affectedRows
    });

    //Generamos los tokens de la empresa
    const tokens = await generateJWT(email);
    //Creamos una constante con la url para el email
    const url = 'http://localhost:4200/#/validarEmail/';

    //Enviamos el email al correo de la empresa
    enviarEmail(url, email, tokens.token, 2);
}

//Funcion para actualizar la contraseña del empresa
const renewPass = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!empresa[0][0]) {
        return res.json({
            status: false,
            message: 'Este Email no existe',
            data: null
        })

    }

    //Se compara el password que se manda por el endpoint con el password de la empresa 
    const validPassword = bcrypt.compareSync(pass, empresa[0][0].pass);

    //Si la comparacion de las contraseñas es igual
    if (validPassword) {
        return res.json({
            status: false,
            message: 'No puedes actualizar la contraseña por la misma contraseña',
            data: null
        });

    }

    //Se generan unos bits aleatorios para la encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    //Se encripta la contraseña 
    const passwordEncrypt = bcrypt.hashSync(pass, salt);
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        email,
        passwordEncrypt
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_renewpass_empresa(?, ?)', mysqlParams);

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
    //Generamos el id del empresa con la funcion getId
    const email = getEmail(token);
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!empresa[0][0]) {
        res.json({
            status: false,
            message: 'No hay registro de un usario con ese email',
            data: null
        });
    }

    //Generamos los tokens de la empresa
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion del empresa con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: empresa[0][0],
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
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!empresa[0][0]) {
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

    //Generamos los tokens de la empresa
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion del empresa con sus tokens
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: empresa[0][0],
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
    let empresa = await queryParams('stp_validaremail_empresa(?)', mysqlParams);

    //Si el email no existe en la BD
    if (!empresa[0][0]) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al validar el email',
            data: null
        });
    }

    //Generamos los tokens de la empresa
    const tokens = await generateTokenRefreshToken(email);

    //Retornamos la informacion de la empresa con sus tokens
    res.json({
        status: true,
        message: 'Email validado correctamente',
        data: empresa[0][0],
        token: tokens.token,
        refreshToken: tokens.refreshToken
    });
}

//Exportamos las funciones para utilizar en nuestros endpoints
module.exports = {
    loginEmpresa,
    registerEmpresas,
    renewPass,
    renewToken,
    renewRefreshtoken,
    validEmail
}