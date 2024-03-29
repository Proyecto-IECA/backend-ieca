const Notificacion = require("../../services/mysql/models/Notificaciones");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const Usuario = require("../../services/mysql/models/Usuarios");
const Vacante = require("../../services/mysql/models/Vacantes");

// Capa de acceso para obtener el CRUD de notificaciones
const addNotificacion = async(notificacion) => {
    return new Promise((resolve, reject) =>
        Notificacion.create(notificacion)
        .then((notificacion) => {
            return resolve(notificacion);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const obtenerNotificaciones = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Notificacion.findAll({
            order: [
                ["id_notificacion", "DESC"]
            ],
            attributes: [
                "id_notificacion",
                "url",
                "titulo",
                "mensaje",
                "visto",
                "fecha_creacion",
            ],
            where: {
                id_receptor: id_usuario,
            },
            include: [{
                    model: Postulacion,
                    attributes: ["id_postulacion", "fecha_postulacion"],
                    include: {
                        model: Usuario,
                        attributes: ["foto_perfil"],
                    },
                },
                {
                    model: Vacante,
                    attributes: ["id_vacante", "fecha_publicacion"],
                    include: {
                        model: Usuario,
                        attributes: ["foto_perfil"],
                    },
                },
            ],
        })
        .then((notificaciones) => {
            return resolve(notificaciones);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const verNotificacion = async(id_notificacion) => {
    return new Promise((resolve, reject) =>
        Notificacion.update({
            visto: 1,
        }, {
            where: {
                id_notificacion: id_notificacion,
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

const obtenerNumeroNotificaciones = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Notificacion.count({
            where: {
                id_receptor: id_usuario,
                visto: 0,
            },
        })
        .then((numeroN) => {
            return resolve(numeroN);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    addNotificacion,
    obtenerNotificaciones,
    verNotificacion,
    obtenerNumeroNotificaciones,
};