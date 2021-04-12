const usuarioDao = require("./dao");

const createUsuario = async(usuario) => {
    return usuarioDao.createUsuario(usuario);
};

const loginUsuario = async(email) => {
    return usuarioDao.loginUsuario(email);
};

const renewPassUsuario = async(id, pass) => {
    return usuarioDao.renewPassUsuario(id, pass);
};

const validEmail = async(id) => {
    return usuarioDao.validEmail(id);
};

module.exports = {
    createUsuario,
    loginUsuario,
    renewPassUsuario,
    validEmail,
};