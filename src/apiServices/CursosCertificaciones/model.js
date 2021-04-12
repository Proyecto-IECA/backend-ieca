const cursoCertDao = require("./dao");

const getCursosCert = async(id) => {
    return cursoCertDao.getCursosCert(id);
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