const vacanteDao = require("./dao");

const getVacantes = async(id_usuario, fecha) => {
    return vacanteDao.getVacantes(id_usuario, fecha);
};

const getVacantesFilter = async(id_usuario, fecha, perfiles) => {
    return vacanteDao.getVacantesFilter(id_usuario, fecha, perfiles);
};

const getVacante = async(id_vacante) => {
    return vacanteDao.getVacante(id_vacante);
};

const getVacantesEmpresa = async(condicion) => {
    return vacanteDao.getVacantesEmpresa(condicion);
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

const publicarVacante = async(id) => {
    return vacanteDao.publicarVacante(id);
};

const noPublicarVacante = async(id) => {
    return vacanteDao.noPublicarVacante(id);
};

const cerrarVacante = async(id) => {
    return vacanteDao.cerrarVacante(id);
};

const abrirVacante = async(id) => {
    return vacanteDao.abrirVacante(id);
};

const getPostulantes = async(id) => {
    return vacanteDao.getPostulantes(id);
};

const getPerfilesUsuario = async(id) => {
    return vacanteDao.getPerfilesUsuario(id);
};

module.exports = {
    getVacantes,
    getVacantesFilter,
    getVacante,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
    publicarVacante,
    noPublicarVacante,
    cerrarVacante,
    abrirVacante,
    getPostulantes,
    getPerfilesUsuario,
};