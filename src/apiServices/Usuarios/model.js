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

const updateUsuario = async(id, usuario) => {
    return usuarioDao.updateUsuario(id, usuario);
};

const updateFotoUsuario = async(id, foto) => {
    return usuarioDao.updateFotoUsuario(id, foto);
};

const getUsuario = async(id) => {
    return usuarioDao.getUsuario(id);
};

const getUsuarioPerfil = async(id) => {
    return usuarioDao.getUsuarioPerfil(id);
};

module.exports = {
    createUsuario,
    loginUsuario,
    renewPassUsuario,
    validEmail,
    updateUsuario,
    updateFotoUsuario,
    getUsuario,
    getUsuarioPerfil
};