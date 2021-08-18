const expAcademicaModel = require("./model");
const expAcademicaDto = require("../shared/dto");

// Función para obtener experiencias académicas
const getExpAcademicas = async(req, res) => {
    await expAcademicaModel
        .getExpAcademicas(req.params.id)
        .then((expAcademicas) => {
            return res.json(expAcademicaDto.normally(true, expAcademicas));
        })
        .catch((err) => {
            return res.json(expAcademicaDto.normally(false, err));
        });
};

// Función para agregar una experiencia académica
const addExpAcademica = async(req, res) => {
    if (req.body.estudiando === 1) {
        await updateEstudiando(req.body.id_usuario_fk);
    }

    let anio_salida = null;
    if (req.body.anio_salida) {
        anio_salida = req.body.anio_salida.slice(0, 4);
    }

    await expAcademicaModel
        .addExpAcademica({
            nivel: req.body.nivel,
            institucion: req.body.institucion,
            carrera: req.body.carrera,
            anio_entrada: req.body.anio_entrada.slice(0, 4),
            anio_salida: anio_salida,
            estudiando: req.body.estudiando,
            id_usuario_fk: req.body.id_usuario_fk,
        })
        .then((expAcademica) => {
            return res.json(expAcademicaDto.normally(true, expAcademica));
        })
        .catch((err) => {
            return res.json(expAcademicaDto.normally(false, err));
        });
};

// Función para actualizar una experiencia académica
const updateExpAcademica = async(req, res) => {
    if (req.body.estudiando === 1) {
        await updateEstudiando(req.body.id_usuario_fk);
    }

    let anio_salida = null;
    if (req.body.anio_salida) {
        anio_salida = req.body.anio_salida.slice(0, 4);
    }

    await expAcademicaModel
        .updateExpAcademica(req.params.id, {
            nivel: req.body.nivel,
            institucion: req.body.institucion,
            carrera: req.body.carrera,
            anio_entrada: req.body.anio_entrada.slice(0, 4),
            anio_salida: anio_salida,
            estudiando: req.body.estudiando,
        })
        .then((result) => {
            return res.json(
                expAcademicaDto.normally(
                    true,
                    "Éxito al actualizar la experiencia académica"
                )
            );
        })
        .catch((err) => {
            return res.json(expAcademicaDto.normally(false, err));
        });
};

// Función para eliminar una experiencia académica
const deleteExpAcademica = async(req, res) => {
    await expAcademicaModel
        .deleteExpAcademica(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    expAcademicaDto.normally(
                        false,
                        "Ocurrió un error al eliminar la experiencia académica"
                    )
                );
            }

            return res.json(
                expAcademicaDto.normally(
                    true,
                    "Éxito al eliminar la experiencia académica"
                )
            );
        })
        .catch((err) => {
            return res.json(expAcademicaDto.normally(false, err));
        });
};

// Función para actualizar el estado del estudio
const updateEstudiando = async(id) => {
    await expAcademicaModel
        .updateEstudiando(id)
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
    getExpAcademicas,
    addExpAcademica,
    updateExpAcademica,
    deleteExpAcademica,
};