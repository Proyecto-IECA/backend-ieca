const vacanteDao = require("./dao");

const getVacantes = async() => {
    return vacanteDao.getVacantes();
};

const getVacante = async(id_vacante) => {
    return vacanteDao.getVacante(id_vacante);
};

const getVacantesEmpresa = async(id_usuario) => {
    return vacanteDao.getVacantesEmpresa(id_usuario);
};

const addVacante = async(vacante) => {
    return vacanteDao.addVacante(vacante);
};

const updateVacante = async(id, vacante) => {
    return vacanteDao.updateVacante(id, vacante);
};

const deleteVacante = async(id) => {
    return vacanteDao.deleteVacante(id);
};

const getPostulantes = async(id) => {
    return vacanteDao.getPostulantes(id);
};

module.exports = {
    getVacantes,
    getVacante,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
    getPostulantes,
};