//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { generateTokenRefreshToken } = require('../helpers/jwt');
//Se requiere de la dependencia bcryptjs y la almacenamos en una constante
const bcrypt = require('bcryptjs');

//Funcion para logearse si eres empresa
const loginEmpresa = async(req, res) => {
    /*Se crea una constante con los atributos para iniciar sesion si eres empresa por medio
    del body de nuestro endpoint*/
    const { email, pass } = req.body;
    /*Se crea una constante con todos los parametros necesarios para iniciar sesion como empresa 
    en la BD*/
    const mysqlParams = [
        email
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParams);
    //Se verifica si existe el email en la BD
    if (empresa[0] == '') {
        res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    } else {
        //Se compara el password que se manda por el endpoint con el password de la empresa
        const validPassword = bcrypt.compareSync(pass, empresa[0][0].pass);

        //Si la comparacion de las contraseñas es falsa
        if (!validPassword) {
            res.json({
                status: false,
                message: 'Password incorrecto',
                data: null
            });
        } else {

            //Se guarda en una constante el id de la empresa
            const id_empresa = empresa[0][0].id_empresa;
            /*Se crean los token con el metodo generateTokenRefreshToken pasando el id de
            de la empresa y el tipo 2 para indicar que es la empresa*/
            const tokens = await generateTokenRefreshToken(id_empresa, 2);

            //Retornamos la informacion de la empresa con sus tokens
            res.json({
                status: true,
                message: 'Acceso correcto',
                data: empresa[0][0],
                token: tokens.token,
                refreshToken: tokens.refreshToken
            });
        }
    }
}

//Funcion para registrarte como postulante
const registerEmpresas = async(req, res) => {
    /*Se crea una constante con los atributos para registrar a una empresa por medio
    del body de nuestro endpoint*/
    const {
        nombre,
        administrador,
        ubicacion,
        giro,
        email,
        pass
    } = req.body;
    /*Se crea una constante con todos los parametros necesarios para registrar a la empresa 
    en la BD*/
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);
    //Se verifica si el email no existe en la BD
    if (empresa[0] == '') {
        //Se generan unos bits aleatorios para la encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        //Se encripta la contraseña 
        const passwordEncrypt = bcrypt.hashSync(pass, salt);
        /*Se crea una constante con todos los parametros necesarios para registrar a la empresa 
        en la BD*/
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

    let result = await queryParams('stp_renewpass_empresa(?, ?)', mysqlParams);

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

const validarEmail = async(req, res) => {
    const { email } = req.body;
    const mysqlParams = [
        email
    ];

    let result = await queryParams('stp_validaremail_empresa(?)', mysqlParams);

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
    loginEmpresa,
    renewPass,
    validarEmail,
    registerEmpresas
}