const { queryParams } = require('../../dal/data-access');

const loginEmpresa = async(req, res) => {
    const { email } = req.body;
    const mysqlParams = [
        email
    ];
    let result = await queryParams('stp_login_empresa(?)', mysqlParams);

    if (result[0]) {
        res.json({
            status: true,
            message: 'Inicio de sesion correcto',
            data: result[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Inicio de sesion incorrecto',
            data: result
        });
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
    const mysqlParams = [
        nombre,
        administrador,
        ubicacion,
        giro,
        email,
        pass
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