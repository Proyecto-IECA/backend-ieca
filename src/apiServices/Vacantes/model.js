const vacanteDao = require("./dao");

const getVacantesRecientes = async(id_usuario) => {
    return vacanteDao.getVacantesRecientes(id_usuario);
};

const getVacantesRecomendadas = async(id_usuario, perfiles) => {
    return vacanteDao.getVacantesRecomendadas(id_usuario, perfiles);
};

const getVacantesGeneral = async(id_usuario, fecha, limites) => {
    return vacanteDao.getVacantesGeneral(id_usuario, fecha, limites);
};

const getVacantesGeneralFilter = async(id_usuario, fecha, limites, perfiles) => {
    return vacanteDao.getVacantesGeneralFilter(id_usuario, fecha, limites, perfiles);
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
    getVacantesRecientes,
    getVacantesRecomendadas,
    getVacantesGeneral,
    getVacantesGeneralFilter,
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