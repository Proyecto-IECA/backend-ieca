const Comentario = require("../../services/mysql/models/Comentarios");
const Usuario = require("../../services/mysql/models/Usuarios");

const getComentariosEmpresa = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: ["nombre", "pagina_web", "calificacion", "numero_calificaciones"],
            include: {
                model: Comentario
            }
        })
        .then((comentarios) => {
            return resolve(comentarios);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    getComentariosEmpresa,
};