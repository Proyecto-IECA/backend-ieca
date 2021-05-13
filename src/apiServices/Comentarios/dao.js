const Comentario = require("../../services/mysql/models/Comentarios");
const Usuario = require("../../services/mysql/models/Usuarios");

const getComentariosEmpresa = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: [
                "nombre",
                "pagina_web",
                "calificacion",
                "numero_calificaciones",
            ],
            include: {
                model: Comentario,
            },
        })
        .then((comentarios) => {
            return resolve(comentarios);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addComentario = async(comentario) => {
    return new Promise((resolve, reject) =>
        Comentario.create(comentario)
        .then((comentario) => {
            return resolve(comentario);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const updateComentario = async(id, comentario) => {
    return new Promise((resolve, reject) => {
        Comentario.update(comentario, {
                where: {
                    id_comentario: id,
                },
            })
            .then((result) => {
                return resolve(result);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

const deleteComentario = async(id) => {
    return new Promise((resolve, reject) => {
        Comentario.destroy({
                where: {
                    id_comentario: id,
                },
            })
            .then((result) => {
                return resolve(result);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};


module.exports = {
    getComentariosEmpresa,
    addComentario,
    updateComentario,
    deleteComentario,
};