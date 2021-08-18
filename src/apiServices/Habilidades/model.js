const habilidadDao = require("./dao");

// Modelo del CRUD de habilidades
const getHabilidades = async(descripcion) => {
    return habilidadDao.getHabilidades(descripcion);
};

const getHabilidadesUsuario = async(id_usuario) => {
    return habilidadDao.getHabilidadesUsuario(id_usuario);
};

const addHabilidad = async(descripcion, id_usuario) => {
    return habilidadDao.addHabilidad(descripcion, id_usuario);
};

const deleteHabilidades = async(id_usuario, habilidades) => {
    return habilidadDao.deleteHabilidades(id_usuario, habilidades);
};

module.exports = {
    getHabilidades,
    getHabilidadesUsuario,
    addHabilidad,
    deleteHabilidades,
};