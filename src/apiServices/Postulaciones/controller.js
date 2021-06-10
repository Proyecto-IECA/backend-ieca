const postulacionModel = require("./model");
const postulacionDto = require("../shared/dto");
const moment = require("moment");

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

const deletePostulacion = async(req, res) => {
    await postulacionModel
        .deletePostulacion(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrio un error al eliminar la postulacion"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Exito al eliminar la postulacion")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

const cancelPostulacion = async(req, res) => {
    await postulacionModel
        .cancelPostulacion(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrio un error al cancelar la postulacion"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Exito al cancelar la postulacion")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

const aceptarPostulacion = async(req, res) => {
    let fecha = moment().add(10, 'days').format('YYYY-MM-DD');


    await postulacionModel
        .aceptarPostulacion(req.params.id, fecha)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrio un error al aceptar la postulacion"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Exito al aceptar la postulacion")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

const rechazarPostulacion = async(req, res) => {
    await postulacionModel
        .rechazarPostulacion(req.params.id, req.body.comentario)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    postulacionDto.normally(
                        false,
                        "Ocurrio un error al rechazar la postulacion"
                    )
                );
            }

            return res.json(
                postulacionDto.normally(true, "Exito al rechazar la postulacion")
            );
        })
        .catch((err) => {
            return res.json(postulacionDto.normally(false, err));
        });
};

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