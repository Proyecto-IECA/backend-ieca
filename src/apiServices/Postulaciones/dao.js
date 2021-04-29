const Postulacion = require("../../services/mysql/models/Postulaciones");

const addPostulacion = async(postulacion) => {
    return new Promise((resolve, reject) =>
        Postulacion.create(postulacion)
        .then((postulacion) => {
            return resolve(postulacion);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const deletePostulacion = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.destroy({
            where: {
                id_postulacion: id,
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

const cancelPostulacion = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.update({ activo: 0 }, {
            where: {
                id_postulacion: id,
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

const aceptarPostulacion = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.update({
            aceptada: 1,
            rechazada: 0,
        }, {
            where: {
                id_postulacion: id,
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

const rechazarPostulacion = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.update({
            aceptada: 0,
            rechazada: 1,
        }, {
            where: {
                id_postulacion: id,
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
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
};