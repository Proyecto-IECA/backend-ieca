const idiomaDao = require("./dao");

// Modelo del CRUD de idiomas
const getIdiomas = async(descripcion) => {
    return idiomaDao.getIdiomas(descripcion);
};

const getIdiomasUsuario = async(id_usuario) => {
    return idiomaDao.getIdiomasUsuario(id_usuario);
};

const addIdioma = async(descripcion, id_usuario) => {
    return idiomaDao.addIdioma(descripcion, id_usuario);
};

const deleteIdiomas = async(id_usuario, Idiomas) => {
    return idiomaDao.deleteIdiomas(id_usuario, Idiomas);
};

module.exports = {
    getIdiomas,
    getIdiomasUsuario,
    addIdioma,
    deleteIdiomas,
};