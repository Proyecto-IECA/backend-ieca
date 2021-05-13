const comentarioModel = require("./model");
const comentarioDto = require("../shared/dto");

const getComentariosEmpresa = async(req, res) => {
    await comentarioModel
        .getComentariosEmpresa(req.params.id)
        .then((comentarios) => {
            return res.json(comentarioDto.normally(true, comentarios));
        })
        .catch((err) => {
            return res.json(comentarioDto.normally(false, err));
        });
};

const addComentario = async(req, res) => {
    await comentarioModel
        .addComentario({
            id_emisor: req.body.id_emisor,
            id_receptor: req.body.id_receptor,
            comentario: req.body.comentario,
        })
        .then((comentario) => {
            return res.json(comentarioDto.normally(true, comentario));
        })
        .catch((err) => {
            return res.json(comentarioDto.normally(false, err));
        });
};

const updateComentario = async(req, res) => {
    await comentarioModel
        .updateComentario(req.params.id, {
            id_emisor: req.body.id_emisor,
            id_receptor: req.body.id_receptor,
            comentario: req.body.comentario,
            fecha_publicacion: new Date(Date.now()),
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    comentarioDto.normally(
                        false,
                        "Ocurrio un error al actualizar el comentario"
                    )
                );
            }

            return res.json(
                comentarioDto.normally(true, "Exito al actualizar el comentario")
            );
        })
        .catch((err) => {
            return res.json(comentarioDto.normally(false, err));
        });
};

const deleteComentario = async(req, res) => {
    await comentarioModel
        .deleteComentario(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    comentarioDto.normally(
                        false,
                        "Ocurrio un error al eliminar el comentario"
                    )
                );
            }

            return res.json(
                comentarioDto.normally(true, "Exito al eliminar el comentario")
            );
        })
        .catch((err) => {
            return res.json(comentarioDto.normally(false, err));
        });
};

module.exports = {
    getComentariosEmpresa,
    addComentario,
    updateComentario,
    deleteComentario,
};