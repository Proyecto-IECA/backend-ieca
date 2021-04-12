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

const updateUsuario = async(id, usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.update(usuario, {
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

const updateFotoUsuario = async(id, foto) => {
    return new Promise((resolve, reject) =>
        Usuario.update(foto, {
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

const getUsuario = async(id) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id, {
            where: {
                activo: 1,
            },
        })
        .then((usuario) => {
            return resolve(usuario);
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
    updateUsuario,
    updateFotoUsuario,
    getUsuario,
};