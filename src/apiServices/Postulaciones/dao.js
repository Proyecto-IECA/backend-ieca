const sequelize = require("sequelize");

const Postulacion = require("../../services/mysql/models/Postulaciones");
const Usuario = require("../../services/mysql/models/Usuarios");
const Vacante = require("../../services/mysql/models/Vacantes");

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

const aceptarPostulacion = async(id, fecha) => {
    return new Promise((resolve, reject) =>
        Postulacion.update({
            aceptada: 1,
            rechazada: 0,
            fecha_post_aceptada: fecha,
            titulo: "Felicidades la empresa acepto tu postulación",
            comentario: "Revisa tu correo que se te contactara por ese medio"
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

const rechazarPostulacion = async(id, comentario) => {
    return new Promise((resolve, reject) =>
        Postulacion.update({
            aceptada: 0,
            rechazada: 1,
            fecha_post_aceptada: null,
            titulo: 'Lo sentimos, tu postulación fue rechazada',
            comentario: comentario
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

const getPostulante = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.findByPk(id, {
            attributes: [
                "id_postulacion",
                "fecha_postulacion",
                "aceptada",
                "rechazada",
            ],
            include: [{
                model: Vacante,
                attributes: ["id_vacante", "puesto"],
                include: {
                    model: Usuario,
                    attributes: ["nombre"]
                }
            }, {
                model: Usuario,
                attributes: [
                    "id_usuario",
                    "nombre",
                    "apellido_paterno",
                    "apellido_materno",
                    "fecha_nacimiento",
                    "telefono_casa",
                    "telefono",
                    "pais",
                    "codigo_postal",
                    "ciudad",
                    "domicilio",
                    "foto_perfil",
                    "email",
                ],
            }, ],
        })
        .then((postulante) => {
            return resolve(postulante);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPostulaciones = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Postulacion.findAll({
            where: {
                id_usuario_fk: id_usuario,
                activo: 1
            },
            attributes: [
                "id_postulacion", [sequelize.fn('date_format', sequelize.col('fecha_postulacion'), '%d/%m/%Y'), 'fecha_postulacion'],
                "aceptada",
                "rechazada",
                "id_vacante_fk",
                "comentario",
                "titulo"
            ],
            include: [{
                model: Vacante,
                attributes: ["puesto", "modalidad", "nivel"],
                include: [{
                    model: Usuario,
                    attributes: ["nombre"]
                }]
            }]
        })
        .then((postulaciones) => {
            return resolve(postulaciones);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPostulacion = async(id_usuario, id_vacante) => {
    return new Promise((resolve, reject) =>
        Postulacion.findOne({
            where: {
                id_usuario_fk: id_usuario,
                id_vacante_fk: id_vacante,
                activo: 1
            },
            include: [{
                model: Usuario,
                attributes: ["nombre", "apellido_paterno", "apellido_materno"]
            }, {
                model: Vacante,
                attributes: ["puesto"],
                include: {
                    model: Usuario,
                    attributes: ["id_usuario"]
                }
            }]
        })
        .then((postulacion) => {
            return resolve(postulacion);
        })
        .catch((err) => {
            return reject(err);
        })
    )
}

module.exports = {
    addPostulacion,
    deletePostulacion,
    cancelPostulacion,
    aceptarPostulacion,
    rechazarPostulacion,
    getPostulante,
    getPostulaciones,
    getPostulacion
};