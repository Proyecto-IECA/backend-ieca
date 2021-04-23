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

const getPerfilesVacante = async(id_vacante) => {
    return perfilDao.getPerfilesVacante(id_vacante);
};

const addPerfilVacante = async(descripcion, id_vacante) => {
    return perfilDao.addPerfilVacante(descripcion, id_vacante);
};

const deletePerfilesVacante = async(id_vacante, perfiles) => {
    return perfilDao.deletePerfilesVacante(id_vacante, perfiles);
};

module.exports = {
    getPerfiles,
    getPerfilesUsuario,
    addPerfil,
    deletePerfiles,
    getPerfilesVacante,
    addPerfilVacante,
    deletePerfilesVacante,
};