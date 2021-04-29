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

const aceptarPostulacion = async(id) => {
    return postulacionDao.aceptarPostulacion(id);
};

const rechazarPostulacion = async(id) => {
    return postulacionDao.rechazarPostulacion(id);
};

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
};