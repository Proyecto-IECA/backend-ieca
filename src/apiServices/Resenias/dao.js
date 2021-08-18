const { Op } = require("sequelize");

const Resenia = require("../../services/mysql/models/Resenias");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const Vacante = require("../../services/mysql/models/Vacantes");

// Capa de acceso para obtener el CRUD de Reseñas
const getUsuarios = async(ids) => {
    return new Promise((resolve, reject) =>
        Usuario.findAll({
            attributes: ["nombre", "foto_perfil"],
            where: {
                id_usuario: {
                    [Op.or]: ids,
                },
            },
        })
        .then((usuarios) => {
            return resolve(usuarios);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getReseniasUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: [
                "nombre",
                "pagina_web",
                "calificacion",
                "numero_calificaciones",
            ],
            include: {
                model: Resenia,
            },
        })
        .then((resenias) => {
            return resolve(resenias);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getUsuariosEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: ["id_usuario", "tipo_usuario"],
        })
        .then((usuario) => {
            return resolve(usuario);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPostulantesEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            attributes: ["id_vacante"],
            where: {
                id_usuario_fk: id_usuario,
            },
            include: {
                model: Postulacion,
                attributes: ["id_postulacion", "fecha_post_aceptada"],
                where: {
                    fecha_post_aceptada: {
                        [Op.lte]: new Date(Date.now()),
                    },
                },
                include: {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre", "foto_perfil"],
                    include: {
                        model: Resenia,
                    },
                },
            },
        })
        .then((postulantesEvaluar) => {
            return resolve(postulantesEvaluar);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getEmpresasEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Postulacion.findAll({
            attributes: ["id_postulacion", "fecha_post_aceptada"],
            where: {
                id_usuario_fk: id_usuario,
                fecha_post_aceptada: {
                    [Op.lte]: new Date(Date.now()),
                },
            },
            include: {
                model: Vacante,
                attributes: ["id_vacante"],
                include: {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre", "foto_perfil"],
                    include: {
                        model: Resenia,
                    },
                },
            },
        })
        .then((empresasEvaluar) => {
            return resolve(empresasEvaluar);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const calificar = async(id_emisor, id_receptor, calif, coment) => {
    return new Promise((resolve, reject) =>
        Resenia.findOne({
            where: {
                id_emisor: id_emisor,
                id_receptor: id_receptor,
            },
        })
        .then((resenia) => {
            if (resenia) {
                Resenia.update({
                        fecha_resenia: new Date(Date.now()),
                        calificacion: calif,
                        comentario: coment,
                    }, {
                        where: {
                            id_resenia: resenia.id_resenia,
                        },
                    })
                    .then((result) => {
                        return resolve(resenia);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            } else {
                Resenia.create({
                        id_emisor: id_emisor,
                        id_receptor: id_receptor,
                        calificacion: calif,
                        comentario: coment,
                    })
                    .then((resenia) => {
                        return resolve(resenia);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            }
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const obtenerCalificacion = async(id_receptor) => {
    return new Promise((resolve, reject) =>
        Resenia.sum("calificacion", {
            where: {
                id_receptor: id_receptor,
            },
        })
        .then((resenia) => {
            return resolve(resenia);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const obtenerNumResenias = async(id_receptor) => {
    return new Promise((resolve, reject) =>
        Resenia.count({
            where: {
                id_receptor: id_receptor,
            },
        })
        .then((numResenias) => {
            return resolve(numResenias);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const actualizarCalifUsuario = async(data, id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.update(data, {
            where: {
                id_usuario: id_usuario,
                activo: 1,
            },
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    getUsuariosEvaluar,
    getPostulantesEvaluar,
    getEmpresasEvaluar,
    calificar,
    obtenerCalificacion,
    obtenerNumResenias,
    actualizarCalifUsuario,
    getReseniasUsuario,
    getUsuarios,
};