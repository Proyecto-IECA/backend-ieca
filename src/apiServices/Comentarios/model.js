const comentarioDao = require("./dao");

const getComentariosEmpresa = async(id_usuario) => {
    return comentarioDao.getComentariosEmpresa(id_usuario);
};

module.exports = {
    getComentariosEmpresa,
};