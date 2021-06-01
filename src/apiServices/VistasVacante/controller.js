const vistaVacanteModel = require("./model");
const vistaVacanteDto = require("../shared/dto");

const addVistaVacante = async(req, res) => {
    await vistaVacanteModel
        .updateVistasVacante(req.body.id_vacante_fk)
        .catch((err) => {
            return res.json(vistaVacanteDto.normally(false, err));
        });

    await vistaVacanteModel
        .addVistaVacante(req.body.id_vacante_fk, req.body.id_usuario_fk)
        .then((vistaVacante) => {
            return res.json(vistaVacanteDto.normally(true, vistaVacante));
        })
        .catch((err) => {
            return res.json(vistaVacanteDto.normally(false, err));
        });
};

const getVistasUsuario = async(req, res) => {
    await vistaVacanteModel
        .getVistasUsuario(req.params.id)
        .then((vistasUsuario) => {
            return res.json(vistaVacanteDto.normally(true, vistasUsuario));
        })
        .catch((err) => {
            return res.json(vistaVacanteDto.normally(false, err));
        });
};

module.exports = {
    addVistaVacante,
    getVistasUsuario,
};