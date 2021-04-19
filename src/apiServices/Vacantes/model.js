const vacanteDao = require("./dao");

const getVacantes = async() => {
    return vacanteDao.getVacantes();
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

module.exports = {
    getVacantes,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
};