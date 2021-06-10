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

const rechazarPostulacion = async(id, comentario) => {
    return postulacionDao.rechazarPostulacion(id, comentario);
};

const getPostulante = async(id) => {
    return postulacionDao.getPostulante(id);
};

const getPostulaciones = async(id_usuario) => {
    return postulacionDao.getPostulaciones(id_usuario);
};

const getPostulacion = async(id_usuario, id_vacante) => {
    return postulacionDao.getPostulacion(id_usuario, id_vacante);
};

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
    getPostulante,
    getPostulaciones,
    getPostulacion
};