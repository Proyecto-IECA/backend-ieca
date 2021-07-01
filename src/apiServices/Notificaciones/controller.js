const notificacionModel = require("./model");
const notificacionDto = require("../shared/dto");

const addNotificacion = async(req, res) => {
    await notificacionModel
        .addNotificacion({
            url: req.body.url,
            titulo: req.body.titulo,
            mensaje: req.body.mensaje,
            id_postulacion_fk: req.body.id_postulacion_fk,
            id_vacante_fk: req.body.id_vacante_fk,
            id_receptor: req.body.id_receptor,
            fecha_creacion: new Date(Date.now()),
        })
        .then((notificacion) => {
            return res.json(notificacionDto.normally(true, notificacion));
        })
        .catch((err) => {
            return res.json(notificacionDto.normally(false, err));
        });
};

const getNotificaciones = async(req, res) => {
    await notificacionModel
        .obtenerNotificaciones(req.params.id)
        .then((notificaciones) => {
            return res.json(notificacionDto.normally(true, notificaciones));
        })
        .catch((err) => {
            return res.json(notificacionDto.normally(false, err));
        });
};

const verNotificacion = async(req, res) => {
    await notificacionModel
        .verNotificacion(req.params.id)
        .then((result) => {
            return res.json(notificacionDto.normally(true, result));
        })
        .catch((err) => {
            return res.json(notificacionDto.normally(false, err));
        });
};

const obtenerNumeroNotificaciones = async(req, res) => {
    await notificacionModel
        .obtenerNumeroNotificaciones(req.params.id)
        .then((numeroN) => {
            return res.json(notificacionDto.normally(true, numeroN));
        })
        .catch((err) => {
            return res.json(notificacionDto.normally(false, err));
        });
};

module.exports = {
    addNotificacion,
    getNotificaciones,
    verNotificacion,
    obtenerNumeroNotificaciones
};