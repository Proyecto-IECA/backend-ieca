const postulacionModel = require("./model");
const postulacionDto = require("../shared/dto");

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
                    "Se postulo de manera correcta a la vacante"
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

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
};