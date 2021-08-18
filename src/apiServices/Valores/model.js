const valorDao = require("./dao");

// Modelo del CRUD de valores
const getValores = async(descripcion) => {
    return valorDao.getValores(descripcion);
};

const getValoresUsuario = async(id_usuario) => {
    return valorDao.getValoresUsuario(id_usuario);
};

const addValor = async(descripcion, id_usuario) => {
    return valorDao.addValor(descripcion, id_usuario);
};

const deleteValores = async(id_usuario, valores) => {
    return valorDao.deleteValores(id_usuario, valores);
};

module.exports = {
    getValores,
    getValoresUsuario,
    addValor,
    deleteValores,
};