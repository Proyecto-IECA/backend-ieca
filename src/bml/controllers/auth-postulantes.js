const { queryParams } = require('../../dal/data-access');
const { generateTokenRefreshToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const loginPostulante = async(req, res) => {
    const { email, pass } = req.body;
    const mysqlParams = [
        email
    ];
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParams);
    if (postulante[0] == '') {
        res.json({
            status: false,
            message: 'El Email es incorrecto',
            data: null
        });
    }
    try {

        const validPassword = bcrypt.compareSync(pass, postulante[0][0].pass);

        if (!validPassword) {
            res.json({
                status: false,
                message: 'Password incorrecto',
                data: null
            });
        }
        const id_postulante = postulante[0][0].id_postulante;
        const tokens = await generateTokenRefreshToken(id_postulante, 1);

        res.json({
            status: true,
            message: 'Acceso correcto',
            data: postulante[0][0],
            token: tokens.token,
            refreshToken: tokens.refreshToken
        });

    } catch (error) {
        throw new Error(error)
    }

}

const registerPostulante = async(req, res) => {
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        sexo,
        email,
        pass
    } = req.body;
    const mysqlParam = [email];

    let postulante = await queryParams('stp_login_postulante(?)', mysqlParam);
    if (postulante[0] == '') {
        const salt = bcrypt.genSaltSync();
        const passwordEncrypt = bcrypt.hashSync(pass, salt);
        const mysqlParams = [
            nombre,
            apellido_paterno,
            apellido_materno,
            sexo,
            email,
            passwordEncrypt
        ];
        let result = await queryParams('stp_add_postulante(?, ?, ?, ?, ?, ?)', mysqlParams);
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

module.exports = {
    loginPostulante,
    registerPostulante,
    renewPass,
    validEmail
};