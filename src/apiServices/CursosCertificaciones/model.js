const cursoCertDao = require("./dao");

// Modelo del CRUD de curso y/o certificación
const getCursosCert = async(id_usuario) => {
    return cursoCertDao.getCursosCert(id_usuario);
};

const addCursoCert = async(cursoCert) => {
    return cursoCertDao.addCursoCert(cursoCert);
};

const updateCursoCert = async(id, cursoCert) => {
    return cursoCertDao.updateCursoCert(id, cursoCert);
};

const deleteCursoCert = async(id) => {
    return cursoCertDao.deleteCursoCert(id);
};

module.exports = {
    getCursosCert,
    addCursoCert,
    updateCursoCert,
    deleteCursoCert,
};