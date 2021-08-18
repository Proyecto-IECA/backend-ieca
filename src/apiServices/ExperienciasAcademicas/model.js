const expAcademicaDao = require("./dao");

// Modelo del CRUD de experiencias académicas
const getExpAcademicas = async(id_usuario) => {
    return expAcademicaDao.getExpAcademicas(id_usuario);
};

const addExpAcademica = async(expAcademica) => {
    return expAcademicaDao.addExpAcademica(expAcademica);
};

const updateExpAcademica = async(id, expAcademica) => {
    return expAcademicaDao.updateExpAcademica(id, expAcademica);
};

const deleteExpAcademica = async(id) => {
    return expAcademicaDao.deleteExpAcademica(id);
};

const updateEstudiando = async(id_usuario) => {
    return expAcademicaDao.updateEstudiando(id_usuario);
};

module.exports = {
    getExpAcademicas,
    addExpAcademica,
    updateExpAcademica,
    deleteExpAcademica,
    updateEstudiando,
};