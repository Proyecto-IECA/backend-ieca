const vacanteModel = require("./model");
const vacanteDto = require("../shared/dto");

const getVacantes = async(req, res) => {
    await vacanteModel
        .getVacantes(req.params.id)
        .then((vacantes) => {
            return res.json(vacanteDto.normally(true, vacantes));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

const getVacante = async(req, res) => {
    await vacanteModel
        .getVacante(req.params.id)
        .then((vacante) => {
            return res.json(vacanteDto.normally(true, vacante));
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
            id_sucursal_fk: req.body.id_sucursal_fk,
            publicada: req.body.publicada,
            fecha_publicacion: req.body.fecha_publicacion,
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
            id_sucursal_fk: req.body.id_sucursal_fk,
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

getPostulantes = async(req, res) => {
    await vacanteModel
        .getPostulantes(req.params.id)
        .then((postulantes) => {
            return res.json(vacanteDto.normally(true, postulantes));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

module.exports = {
    getVacantes,
    getVacante,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
    getPostulantes,
};