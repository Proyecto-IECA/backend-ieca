const { queryParams } = require('../../dal/data-access');
const { generateTokenRefreshToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const loginEmpresa = async(req, res) => {
    const { email, pass } = req.body;
    const mysqlParams = [
        email
    ];
    let result = await queryParams('stp_login_empresa(?)', mysqlParams);

    if (result[0] == '') {
        res.json({
            status: false,
            message: 'Inicio de sesion correcto',
            data: null
        });
    }
    try {
        const validPassword = bcrypt.compareSync(pass, result[0][0].pass);

        if (!validPassword) {
            res.json({
                status: false,
                message: 'Password incorrecto',
                data: null
            });
        }
        const id_empresa = result[0][0].id_empresa;
        const tokens = await generateTokenRefreshToken(id_empresa);

        res.json({
            status: true,
            message: 'Acceso correcto',
            data: result[0][0],
            token: tokens.token,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        throw new Error(error)
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

const registerEmpresas = async(req, res) => {
    const {
        nombre,
        administrador,
        ubicacion,
        giro,
        email,
        pass
    } = req.body;
    const mysqlParam = [email];
    let empresa = await queryParams('stp_login_empresa(?)', mysqlParam);
    if (empresa[0] == '') {
        const salt = bcrypt.genSaltSync();
        const passwordEncrypt = bcrypt.hashSync(pass, salt);
        const mysqlParams = [
            nombre,
            administrador,
            ubicacion,
            giro,
            email,
            passwordEncrypt
        ];
        let result = await queryParams('stp_add_empresa(?, ?, ?, ?, ?, ?)', mysqlParams);
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


module.exports = {
    loginEmpresa,
    renewPass,
    validarEmail,
    registerEmpresas
}