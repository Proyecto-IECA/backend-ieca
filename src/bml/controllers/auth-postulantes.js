//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { getEmail, getJWT_ID, generateTokenRefreshToken, getRefreshToken } = require('../helpers/jwt');
//Se requiere de la dependencia bcryptjs y la almacenamos en una constante
const bcrypt = require('bcryptjs');
const { enviarEmail } = require('../helpers/email');
//Funcion para logearse si eres postulante
const loginPostulante = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);
    //Se verifica si existe el email en la BD
    if (postulante[0] == '') {
        res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    } else {
        //Se compara el password que se manda a traves de la peticion con el password del postulante 
        const validPassword = bcrypt.compareSync(pass, postulante[0][0].pass);

        //Si la comparacion de las contraseñas es falsa
        if (!validPassword) {
            res.json({
                status: false,
                message: 'Password incorrecto',
                data: null
            });
        } else {

            //Se guarda en una constante el email del postulante
            const email = postulante[0][0].email;
            //Generamos los tokens del postulante
            const tokens = await generateTokenRefreshToken(email);
            const envio = await enviarEmail();
            console.log(envio);
            //Retornamos la informacion del postulante con sus tokens
            res.json({
                status: true,
                message: 'Acceso correcto',
                data: postulante[0][0],
                token: tokens.token,
                refreshToken: tokens.refreshToken
            });
        }
    }
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
    //Se verifica si el email no existe en la BD
    if (postulante[0] == '') {
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
        let postulante = await queryParams('stp_add_postulante(?, ?, ?, ?, ?, ?, ?)', mysqlParams);
        //Se verifica si se registro y devolvio el postulante
        if (postulante[0][0]) {
            res.json({
                status: true,
                message: 'Cuenta registrada de manera exitosa',
                data: postulante[0][0]
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al crear la cuenta',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        })
    }

}

//Funcion para actualizar la contraseña del postulante
const renewPass = async(req, res) => {
    //Se crea una constante con los atributos del body de nuetra peticion
    const { email, pass } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mySqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mySqlParam);

    //Validamos si existe el email en la BD
    if (postulante[0][0]) {
        //Se compara el password que se manda por la peticio  con el password del postulante 
        const validpassword = bcrypt.compareSync(pass, postulante[0][0].pass);

        //Si la comparacion de las contraseñas es falsa
        if (!validpassword) {
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
            //Se verifica si los renglones afectados de la BD son diferentes de cero
            if (result.affectedRows != 0) {
                res.json({
                    status: true,
                    message: 'Contraseña actualizada correctamente',
                    data: result.affectedRows
                });
            } else {
                res.json({
                    status: false,
                    message: 'Ocurrio un error al actualizar la contraseña',
                    data: result.affectedRows
                });
            }
        } else {
            res.json({
                status: false,
                message: 'No puedes actualizar la contraseña por la misma contraseña',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Este email no a sido registrado aun',
            data: null
        });
    }
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
    const postulante = await queryParams('stp_login_postulante(?)', mysqlParam);

    //Se verifica si no existe el postulante en la BD
    if (!postulante[0][0]) {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
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
    const postulante = await queryParams('stp_login_postulante(?)', mysqlParam);
    //Se verifica si no existe el postulante en la BD
    if (!postulante[0][0]) {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }

    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParamT = [id_token];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    const result = await queryParams('stp_update_token(?)', mysqlParamT);

    //Se verifica si los renglones afectados de la BD son diferentes de cero
    if (result.affectedRows != 0) {

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
    } else {
        res.json({
            status: false,
            message: 'No se pudo generar el token',
            data: result.affectedRows
        });
    }
}

const validEmail = async(req, res) => {
    const { email } = req.body;
    const mysqlParams = [
        email
    ];

    let result = await queryParams('stp_validaremail_postulante(?)', mysqlParams);

    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'Email validado correctamente',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al validar el email',
            data: result.affectedRows
        });
    }
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