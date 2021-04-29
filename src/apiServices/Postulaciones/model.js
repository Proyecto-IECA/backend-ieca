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

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
};