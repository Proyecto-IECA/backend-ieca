const vacanteModel = require("./model");
const vacanteDto = require("../shared/dto");

const getVacantes = async(req, res) => {
    await vacanteModel
        .getVacantes()
        .then((vacantes) => {
            return res.json(vacanteDto.normally(true, vacantes));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

const getVacantesEmpresa = async(req, res) => {
    await vacanteModel
        .getVacantesEmpresa(req.params.id)
        .then((vacantes) => {
            return res.json(vacanteDto.normally(true, vacantes));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

const addVacante = async(req, res) => {
    await vacanteModel
        .addVacante({
            puesto: req.body.puesto,
            sueldo: req.body.sueldo,
            descripcion: req.body.descripcion,
            modalidad: req.body.modalidad,
            nivel: req.body.nivel,
            id_usuario_fk: req.body.id_usuario_fk,
            publicada: req.body.publicada,
        })
        .then((vacante) => {
            return res.json(vacanteDto.normally(true, vacante));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

const updateVacante = async(req, res) => {
    await vacanteModel
        .updateVacante(req.params.id, {
            puesto: req.body.puesto,
            sueldo: req.body.sueldo,
            descripcion: req.body.descripcion,
            modalidad: req.body.modalidad,
            nivel: req.body.nivel,
            publicada: req.body.publicada,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(
                        false,
                        "Ocurrio un error al actualizar la vacante"
                    )
                );
            }

            return res.json(
                vacanteDto.normally(true, "Exito al actualizar la vacante")
            );
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

const deleteVacante = async(req, res) => {
    await vacanteModel
        .deleteVacante(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    vacanteDto.normally(false, "Ocurrio un error al eliminar la vacante")
                );
            }

            return res.json(
                vacanteDto.normally(true, "Exito al eliminar la vacante")
            );
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

module.exports = {
    getVacantes,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
};