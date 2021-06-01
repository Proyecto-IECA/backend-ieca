const vistaVacanteModel = require("./dao");

const addVistaVacante = async(id_vacante, id_usuario) => {
    return vistaVacanteModel.addVistaVacante(id_vacante, id_usuario);
};

const updateVistasVacante = async(id_vacante) => {
    return vistaVacanteModel.updateVistasVacante(id_vacante);
};

const getVistasUsuario = async(id_vacante) => {
    return vistaVacanteModel.getVistasUsuario(id_vacante);
};

module.exports = {
    addVistaVacante,
    updateVistasVacante,
    getVistasUsuario,
};