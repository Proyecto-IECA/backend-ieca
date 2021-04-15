const perfilDao = require("./dao");

const getPerfiles = async(descripcion) => {
    return perfilDao.getPerfiles(descripcion);
};

const getPerfilesUsuario = async(id_usuario) => {
    return perfilDao.getPerfilesUsuario(id_usuario);
};

const addPerfil = async(descripcion, id_usuario) => {
    return perfilDao.addPerfil(descripcion, id_usuario);
};

const deletePerfiles = async(id_usuario, perfiles) => {
    return perfilDao.deletePerfiles(id_usuario, perfiles);
};

module.exports = {
    getPerfiles,
    getPerfilesUsuario,
    addPerfil,
    deletePerfiles,
};