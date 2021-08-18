const reseniaDao = require("./dao");

// Modelo del CRUD de reseñas
const getUsuarios = async(ids) => {
    return reseniaDao.getUsuarios(ids);
};

const getReseniasUsuario = async(id_usuario) => {
    return reseniaDao.getReseniasUsuario(id_usuario);
};

const getUsuariosEvaluar = async(id_usuario) => {
    return reseniaDao.getUsuariosEvaluar(id_usuario);
};

const getPostulantesEvaluar = async(id_usuario) => {
    return reseniaDao.getPostulantesEvaluar(id_usuario);
};

const getEmpresasEvaluar = async(id_usuario) => {
    return reseniaDao.getEmpresasEvaluar(id_usuario);
};

const calificar = async(id_emisor, id_receptor, calif, coment) => {
    return reseniaDao.calificar(id_emisor, id_receptor, calif, coment);
};

const obtenerCalificacion = async(id_receptor) => {
    return reseniaDao.obtenerCalificacion(id_receptor);
};

const obtenerNumResenias = async(id_receptor) => {
    return reseniaDao.obtenerNumResenias(id_receptor);
};

const actualizarCalifUsuario = async(data, id_usuario) => {
    return reseniaDao.actualizarCalifUsuario(data, id_usuario);
};

module.exports = {
    getUsuariosEvaluar,
    getPostulantesEvaluar,
    getEmpresasEvaluar,
    calificar,
    obtenerCalificacion,
    obtenerNumResenias,
    actualizarCalifUsuario,
    getReseniasUsuario,
    getUsuarios,
};