const califDao = require("./dao");

const getUsuariosEvaluar = async(id_usuario) => {
    return califDao.getUsuariosEvaluar(id_usuario);
};

const getPostulantesEvaluar = async(id_usuario) => {
    return califDao.getPostulantesEvaluar(id_usuario);
};

const getEmpresasEvaluar = async(id_usuario) => {
    return califDao.getEmpresasEvaluar(id_usuario);
};

const calificar = async(id_emisor, id_receptor, calif) => {
    return califDao.calificar(id_emisor, id_receptor, calif);
};

const obtenerCalificacion = async(id_receptor) => {
    return califDao.obtenerCalificacion(id_receptor);
};

const obtenerNumCalificaciones = async(id_receptor) => {
    return califDao.obtenerNumCalificaciones(id_receptor);
};

const actualizarCalifUsuario = async(data, id_usuario) => {
    return califDao.actualizarCalifUsuario(data, id_usuario);
};


module.exports = {
    getUsuariosEvaluar,
    getPostulantesEvaluar,
    getEmpresasEvaluar,
    calificar,
    obtenerCalificacion,
    obtenerNumCalificaciones,
    actualizarCalifUsuario,
};