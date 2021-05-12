const califDao = require("./dao");

const getUsuariosEvaluar = async(id_usuario) => {
    return califDao.getUsuariosEvaluar(id_usuario);
};

const getPostulantesEvaluar = async(id_usuario) => {
    return califDao.getPostulantesEvaluar(id_usuario);
}

const getEmpresasEvaluar = async(id_usuario) => {
    return califDao.getEmpresasEvaluar(id_usuario);
}

module.exports = {
    getUsuariosEvaluar,
    getPostulantesEvaluar,
    getEmpresasEvaluar
};