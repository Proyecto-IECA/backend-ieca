const postulacionModel = require("./model");
const postulacionDto = require("../shared/dto");
const moment = require("moment");

// Función para agregar una nueva postulación
const addPostulacion = async(req, res) => {
    await postulacionModel
        .addPostulacion({
            id_usuario_fk: req.body.id_usuario_fk,
            id_vacante_fk: req.body.id_vacante_fk,
        })
        .then((postulacion) => {
            return res.json(
                postulacionDto.normally(
                    true,
                    postulacion
                )
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para borrar una postulación
const deletePostulacion = async(req, res) => {
    await postulacionModel
        .deletePostulacion(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrió un error al eliminar la postulación"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Éxito al eliminar la postulación")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para cancelar una postulación
const cancelPostulacion = async(req, res) => {
    await postulacionModel
        .cancelPostulacion(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrió un error al cancelar la postulación"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Éxito al cancelar la postulación")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para aceptar una postulación
const aceptarPostulacion = async(req, res) => {
    let fecha = moment().add(10, 'days').format('YYYY-MM-DD');


    await postulacionModel
        .aceptarPostulacion(req.params.id, fecha)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrió un error al aceptar la postulación"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Éxito al aceptar la postulación")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para rechazar una postulación
const rechazarPostulacion = async(req, res) => {
    await postulacionModel
        .rechazarPostulacion(req.params.id, req.body.comentario)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrió un error al rechazar la postulación"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Éxito al rechazar la postulación")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para obtener un postulante
const getPostulante = async(req, res) => {
    await postulacionModel
        .getPostulante(req.params.id)
        .then((postulante) => {
            return res.json(postulacionDto.normally(true, postulante));
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para obtener las postulaciones
const getPostulaciones = async(req, res) => {
    await postulacionModel
        .getPostulaciones(req.params.id)
        .then((postulaciones) => {
            return res.json(postulacionDto.normally(true, postulaciones));
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

// Función para obtener una postulación
const getPostulacion = async(req, res) => {
    await postulacionModel
        .getPostulacion(req.params.id, req.params.idv)
        .then((postulacion) => {
            return res.json(postulacionDto.normally(true, postulacion));
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
    getPostulante,
    getPostulaciones,
    getPostulacion
};