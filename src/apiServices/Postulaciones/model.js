const postulacionDao = require("./dao");

const addPostulacion = async(postulacion) => {
    return postulacionDao.addPostulacion(postulacion);
};

const deletePostulacion = async(id) => {
    return postulacionDao.deletePostulacion(id);
};

const cancelPostulacion = async(id) => {
    return postulacionDao.cancelPostulacion(id);
};

const aceptarPostulacion = async(id, fecha) => {
    return postulacionDao.aceptarPostulacion(id, fecha);
};

const rechazarPostulacion = async(id) => {
    return postulacionDao.rechazarPostulacion(id);
};

const getPostulante = async(id) => {
    return postulacionDao.getPostulante(id);
};

const getPostulaciones = async(id_usuario) => {
    return postulacionDao.getPostulaciones(id_usuario);
};

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
    getPostulante,
    getPostulaciones,
};