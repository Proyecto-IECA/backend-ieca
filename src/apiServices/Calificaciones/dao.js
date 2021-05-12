const Calificacion = require("../../services/mysql/models/Calificaciones");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const Vacante = require("../../services/mysql/models/Vacantes");
const { Op } = require("sequelize");

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
                    attributes: ["id_usuario", "nombre"],
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
                    attributes: ["id_usuario", "nombre"],
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

const calificar = async(id_emisor, id_receptor, calif) => {
    return new Promise((resolve, reject) =>
        Calificacion.findOne({
            where: {
                id_emisor: id_emisor,
                id_receptor: id_receptor,
            },
        })
        .then((calificacion) => {
            if (calificacion) {
                Calificacion.update({
                        fecha_calificacion: new Date(Date.now()),
                        calificacion: calif,
                    }, {
                        where: {
                            id_calificacion: calificacion.id_calificacion,
                        },
                    })
                    .then((result) => {
                        return resolve(calificacion);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            } else {
                Calificacion.create({
                        id_emisor: id_emisor,
                        id_receptor: id_receptor,
                        calificacion: calif,
                    })
                    .then((calificacion) => {
                        return resolve(calificacion);
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
        Calificacion.sum("calificacion", {
            where: {
                id_receptor: id_receptor,
            },
        })
        .then((calificacion) => {
            return resolve(calificacion);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const obtenerNumCalificaciones = async(id_receptor) => {
    return new Promise((resolve, reject) =>
        Calificacion.count({
            where: {
                id_receptor: id_receptor,
            },
        })
        .then((numCalificaciones) => {
            return resolve(numCalificaciones);
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
    obtenerNumCalificaciones,
    actualizarCalifUsuario,
};