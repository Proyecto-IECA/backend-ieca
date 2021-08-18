const expLaboralModel = require("./model");
const expLaboralDto = require("../shared/dto");

// Función para obtener experiencias laborales
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

// Función para agregar una nueva experiencia laboral
const addExpLaboral = async(req, res) => {
    if (req.body.trabajando == 1) {
        await updateTrabajando(req.body.id_usuario_fk);
    }

    let fecha_salida = null;
    if (req.body.fecha_salida) {
        fecha_salida = req.body.fecha_salida.slice(0, 7)
    }

    await expLaboralModel
        .addExpLaboral({
            puesto: req.body.puesto,
            empresa: req.body.empresa,
            actividades: req.body.actividades,
            fecha_entrada: req.body.fecha_entrada.slice(0, 7),
            fecha_salida: fecha_salida,
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

// Función para actualizar una experiencia laboral
const updateExpLaboral = async(req, res) => {
    if (req.body.trabajando === 1) {
        await updateTrabajando(req.body.id_usuario_fk);
    }

    let fecha_salida = null;
    if (req.body.fecha_salida) {
        fecha_salida = req.body.fecha_salida.slice(0, 7)
    }

    await expLaboralModel
        .updateExpLaboral(req.params.id, {
            puesto: req.body.puesto,
            empresa: req.body.empresa,
            actividades: req.body.actividades,
            fecha_entrada: req.body.fecha_entrada.slice(0, 7),
            fecha_salida: fecha_salida,
            trabajando: req.body.trabajando,
        })
        .then((result) => {
            return res.json(
                expLaboralDto.normally(
                    true,
                    "Éxito al actualizar la experiencia laboral"
                )
            );
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

// Función para eliminar una experiencia laboral
const deleteExpLaboral = async(req, res) => {
    await expLaboralModel
        .deleteExpLaboral(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    expLaboralDto.normally(
                        false,
                        "Ocurrió un error al eliminar la experiencia laboral"
                    )
                );
            }

            return res.json(
                expLaboralDto.normally(true, "Éxito al eliminar la experiencia laboral")
            );
        })
        .catch((err) => {
            return res.json(expLaboralDto.normally(false, err));
        });
};

// Función actualizar el statdo del trabajo
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