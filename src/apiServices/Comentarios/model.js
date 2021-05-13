const comentarioDao = require("./dao");

const getComentariosEmpresa = async(id_usuario) => {
    return comentarioDao.getComentariosEmpresa(id_usuario);
};

const addComentario = async(comentario) => {
    return comentarioDao.addComentario(comentario);
};

const updateComentario = async(id, comentario) => {
    return comentarioDao.updateComentario(id, comentario);
};

const deleteComentario = async(id) => {
    return comentarioDao.deleteComentario(id);
};

module.exports = {
    getComentariosEmpresa,
    addComentario,
    updateComentario,
    deleteComentario,
};