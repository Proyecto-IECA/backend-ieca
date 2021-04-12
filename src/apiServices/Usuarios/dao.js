const Usuario = require("../../services/mysql/models/Usuarios");

const createUsuario = async(usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.create(usuario)
        .then((usuario) => {
            return resolve(usuario);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const loginUsuario = async(email) => {
    return new Promise((resolve, reject) =>
        Usuario.findOne({
            where: {
                email: email,
                activo: 1,
            },
        })
        .then((usuario) => {
            return resolve(usuario);
        })
        .catch((err) => {
            console.log(err);
            return reject(err);
        })
    );
};

const renewPassUsuario = async(id, password) => {
    return new Promise((resolve, reject) =>
        Usuario.update(password, {
            where: {
                id_usuario: id,
                activo: 1,
            },
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const validEmail = async(id) => {
    return new Promise((resolve, reject) =>
        Usuario.update({ email_validado: 1 }, {
            where: {
                id_usuario: id,
                activo: 1,
            },
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    createUsuario,
    loginUsuario,
    renewPassUsuario,
    validEmail,
};