const expLaboralDao = require("./dao");

const getExpLaborales = async(id_usuario) => {
    return expLaboralDao.getExpLaborales(id_usuario);
};

const addExpLaboral = async(expLaboral) => {
    return expLaboralDao.addExpLaboral(expLaboral);
};

const updateExpLaboral = async(id, expLaboral) => {
    return expLaboralDao.updateExpLaboral(id, expLaboral);
};

const deleteExpLaboral = async(id) => {
    return expLaboralDao.deleteExpLaboral(id);
};

const updateTrabajando = async(id_usuario) => {
    return expLaboralDao.updateTrabajando(id_usuario);
};

module.exports = {
    getExpLaborales,
    addExpLaboral,
    updateExpLaboral,
    deleteExpLaboral,
    updateTrabajando,
};