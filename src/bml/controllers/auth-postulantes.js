//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { generateTokenRefreshToken } = require('../helpers/jwt');
//Se requiere de la dependencia bcryptjs y la almacenamos en una constante
const bcrypt = require('bcryptjs');

//Funcion para logearse si eres postulante
const loginPostulante = async(req, res) => {
    /*Se crea una constante con los atributos para iniciar sesion si eres postulante por medio
    del body de nuestro endpoint*/
    const { email, pass } = req.body;
    /*Se crea una constante con todos los parametros necesarios para iniciar sesion como postulante 
    en la BD*/
    const mysqlParams = [
        email
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParams);
    //Se verifica si existe el email en la BD
    if (postulante[0] == '') {
        res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    } else {
        //Se compara el password que se manda por el endpoint con el password del postulante 
        const validPassword = bcrypt.compareSync(pass, postulante[0][0].pass);

        //Si la comparacion de las contraseñas es falsa
        if (!validPassword) {
            res.json({
                status: false,
                message: 'Password incorrecto',
                data: null
            });
        } else {

            //Se guarda en una constante el id del postulante
            const id_postulante = postulante[0][0].id_postulante;
            /*Se crean los token con el metodo generateTokenRefreshToken pasando el id de
            del postulante y el tipo 1 para indicar que es el postulante*/
            const tokens = await generateTokenRefreshToken(id_postulante, 1);

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
    /*Se crea una constante con los atributos para registrar a un postulante por medio
    del body de nuestro endpoint*/
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        sexo,
        email,
        pass
    } = req.body;
    /*Se crea una constante con todos los parametros necesarios para registrar al postulante 
    en la BD*/
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);
    //Se verifica si el email no existe en la BD
    if (postulante[0] == '') {
        //Se generan unos bits aleatorios para la encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        //Se encripta la contraseña 
        const passwordEncrypt = bcrypt.hashSync(pass, salt);
        /*Se crea una constante con todos los parametros necesarios para registrar al postulante 
        en la BD*/
        const mysqlParams = [
            nombre,
            apellido_paterno,
            apellido_materno,
            sexo,
            email,
            passwordEncrypt
        ];

        //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
        let result = await queryParams('stp_add_postulante(?, ?, ?, ?, ?, ?)', mysqlParams);
        //Se verifica si los renglones afectados de la BD son diferentes de cero
        if (result.affectedRows != 0) {
            res.json({
                status: true,
                message: 'Cuenta registrada de manera exitosa',
                data: result.affectedRows
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al crear la cuenta',
                data: result.affectedRows
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

const renewPass = async(req, res) => {
    const { email, pass } = req.body;
    const mysqlParams = [
        email,
        pass
    ];

    let result = await queryParams('stp_renewpass_postulante(?, ?)', mysqlParams);

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
    validEmail
};