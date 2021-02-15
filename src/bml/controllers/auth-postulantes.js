const { queryParams } = require('../../dal/data-access');

const loginPostulante = async(req, res) => {
    const { email } = req.body;
    const mysqlParams = [
        email
    ];
    let postulante = await queryParams('stp_login_postulante(?)', mysqlParams);

    if (postulante[0]) {
        res.json({
            status: true,
            message: 'Inicio de sesion correcto',
            data: postulante[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Inicio de sesion incorrecto',
            data: postulante
        });
    }
}


const registerPostulante = async(req, res) => {
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        email,
        pass
    } = req.body;
    const mysqlParams = [
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        email,
        pass
    ];
    let result = await queryParams('stp_add_postulante(?, ?, ?, ?, ?, ?, ?)', mysqlParams);
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