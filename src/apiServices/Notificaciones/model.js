const notificacionDao = require("./dao");

const addNotificacion = async(notificacion) => {
    return notificacionDao.addNotificacion(notificacion);
};

const obtenerNotificaciones = async(id_usuario) => {
    return notificacionDao.obtenerNotificaciones(id_usuario);
};

const verNotificacion = async(id_notificacion) => {
    return notificacionDao.verNotificacion(id_notificacion);
};

module.exports = {
    addNotificacion,
    obtenerNotificaciones,
    verNotificacion,
};