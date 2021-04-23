const expLaboralModel = require("./model");
const expLaboralDto = require("../shared/dto");

const getExpLaborales = async(req, res) => {
    await expLaboralModel
        .getExpLaborales(req.params.id)
        .then((expLaborales) => {
            return res.json(expLaboralDto.normally(true, expLaborales));
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

const addExpLaboral = async(req, res) => {
    if (req.body.trabajando === 1) {
        await updateTrabajando(req.body.id_usuario);
    }

    await expLaboralModel
        .addExpLaboral({
            puesto: req.body.puesto,
            empresa: req.body.empresa,
            actividades: req.body.actividades,
            fecha_entrada: req.body.fecha_entrada,
            fecha_salida: req.body.fecha_salida,
            trabajando: req.body.trabajando,
            id_usuario_fk: req.body.id_usuario_fk,
        })
        .then((expLaboral) => {
            return res.json(expLaboralDto.normally(true, expLaboral));
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

const updateExpLaboral = async(req, res) => {
    if (req.body.trabajando === 1) {
        await updateTrabajando(req.body.id_usuario);
    }

    await expLaboralModel
        .updateExpLaboral(req.params.id, {
            puesto: req.body.puesto,
            empresa: req.body.empresa,
            actividades: req.body.actividades,
            fecha_entrada: req.body.fecha_entrada,
            fecha_salida: req.body.fecha_salida,
            trabajando: req.body.trabajando,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    expLaboralDto.normally(
                        false,
                        "Ocurrio un error al actualizar la experiencia Laboral"
                    )
                );
            }

            return res.json(
                expLaboralDto.normally(
                    true,
                    "Exito al actualizar la experiencia Laboral"
                )
            );
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

const deleteExpLaboral = async(req, res) => {
    await expLaboralModel
        .deleteExpLaboral(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    expLaboralDto.normally(
                        false,
                        "Ocurrio un error al eliminar la experiencia Laboral"
                    )
                );
            }

            return res.json(
                expLaboralDto.normally(true, "Exito al eliminar la experiencia Laboral")
            );
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

const updateTrabajando = async(id) => {
    await expLaboralModel
        .updateTrabajando(id)
        .then((result) => {
            if (result[0] === 0) {
                return false;
            }

            return true;
        })
        .catch((err) => {
            return false;
        });
};

module.exports = {
    getExpLaborales,
    addExpLaboral,
    updateExpLaboral,
    deleteExpLaboral,
};