const moment = require("moment");
const sequelize = require("sequelize");

const Vacante = require("../../services/mysql/models/Vacantes");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const VacanteFav = require("../../services/mysql/models/VacantesFavoritas");
const Perfil = require("../../services/mysql/models/Perfiles");

// Capa de acceso para el CRUD de vacantes
const getVacantes = async(id_usuario, fecha) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            order: [
                ["fecha_publicacion", fecha]
            ],
            where: {
                activo: 1,
                publicada: 1,
                disponible: 1
            },
            attributes: [
                "id_vacante",
                "puesto", [sequelize.fn('date_format', sequelize.col('fecha_publicacion'), '%d/%m/%Y'), 'fecha_publicacion'],
                "imagen",
                "sueldo",
                "descripcion",
                "disponible",
                "modalidad",
                "nivel",
                "vistas",
                "publicada",
                "activo",
                "id_sucursal_fk",
                "id_usuario_fk"
            ],
            include: [{
                    model: Usuario,
                    attributes: ["nombre", "foto_perfil"],
                },
                {
                    model: Perfil,
                    attributes: [],
                },
                {
                    model: VacanteFav,
                    include: [{
                        model: Usuario,
                        attributes: [],
                        where: {
                            id_usuario: id_usuario,
                        },
                    }, ],
                },
            ],
        })
        .then((vacantes) => {
            return resolve(vacantes);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVacantesFilter = async(id_usuario, fecha, perfiles) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            order: [
                ["fecha_publicacion", fecha]
            ],
            where: {
                activo: 1,
                publicada: 1,
                disponible: 1
            },
            attributes: [
                "id_vacante",
                "puesto", [sequelize.fn('date_format', sequelize.col('fecha_publicacion'), '%d/%m/%Y'), 'fecha_publicacion'],
                "imagen",
                "sueldo",
                "descripcion",
                "disponible",
                "modalidad",
                "nivel",
                "vistas",
                "publicada",
                "activo",
                "id_sucursal_fk",
                "id_usuario_fk"
            ],
            include: [{
                    model: Usuario,
                    attributes: ["nombre", "foto_perfil"],
                },
                {
                    model: Perfil,
                    attributes: [],
                    where: {
                        descripcion: perfiles,
                    },
                },
                {
                    model: VacanteFav,
                    include: [{
                        model: Usuario,
                        attributes: [],
                        where: {
                            id_usuario: id_usuario,
                        },
                    }, ],
                },
            ],
        })
        .then((vacantes) => {
            return resolve(vacantes);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVacante = async(id_vacante, id_usuario) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id_vacante, {
            attributes: [
                "id_vacante",
                "puesto", [sequelize.fn('date_format', sequelize.col('fecha_publicacion'), '%d/%m/%Y'), 'fecha_publicacion'],
                "imagen",
                "sueldo",
                "descripcion",
                "disponible",
                "modalidad",
                "nivel",
                "vistas",
                "publicada",
                "activo",
                "id_sucursal_fk",
                "id_usuario_fk"
            ],
            include: [{
                model: Usuario,
                attributes: ["id_usuario", "nombre", "pagina_web", "foto_perfil", "ubicacion"],
            }, {
                model: VacanteFav,
                attributes: ["id_vacante_favorita"],
                include: [{
                    model: Usuario,
                    attributes: [],
                    where: {
                        id_usuario: id_usuario,
                    },
                }, ],
            }],
        })
        .then((vacante) => {
            return resolve(vacante);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVacantesEmpresa = async(condicion) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            where: condicion,
            attributes: [
                "id_vacante",
                "puesto", [sequelize.fn('date_format', sequelize.col('fecha_publicacion'), '%d/%m/%Y'), 'fecha_publicacion'],
                "imagen",
                "sueldo",
                "descripcion",
                "disponible",
                "modalidad",
                "nivel",
                "vistas",
                "publicada",
                "activo",
                "id_sucursal_fk",
                "id_usuario_fk"
            ],
        })
        .then((vacantes) => {
            return resolve(vacantes);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addVacante = async(vacante) => {
    return new Promise((resolve, reject) =>
        Vacante.create(vacante)
        .then((vacante) => {
            return resolve(vacante);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const updateVacante = async(id, vacante) => {
    return new Promise((resolve, reject) =>
        Vacante.update(vacante, {
            where: {
                id_vacante: id,
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

const deleteVacante = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.update({
            activo: 0
        }, {
            where: {
                id_vacante: id,
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

const publicarVacante = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.update({
            publicada: 1,
            fecha_publicacion: moment().format(),
        }, {
            where: {
                id_vacante: id,
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

const noPublicarVacante = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.update({
            publicada: 0,
        }, {
            where: {
                id_vacante: id,
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

const cerrarVacante = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.update({
            disponible: 0,
        }, {
            where: {
                id_vacante: id,
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

const abrirVacante = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.update({
            disponible: 1,
        }, {
            where: {
                id_vacante: id,
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

const getPostulantes = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id, {
            attributes: ["id_vacante", "puesto"],
            include: [{
                model: Usuario,
                attributes: ["nombre"]
            }, {
                model: Postulacion,
                attributes: [
                    "id_postulacion", [sequelize.fn('date_format', sequelize.col('fecha_postulacion'), '%d/%m/%Y'), 'fecha_postulacion'],
                    "aceptada",
                    "rechazada",
                ],
                where: {
                    activo: 1,
                },
                include: [{
                    model: Usuario,
                    attributes: [
                        "id_usuario",
                        "nombre",
                        "email",
                        "telefono",
                        "calificacion",
                        "ciudad",
                        "foto_perfil"
                    ],
                }, ],
            }, ],
        })
        .then((postulantes) => {
            return resolve(postulantes);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPostulaciones = async(id) => {
    return new Promise((resolve, reject) =>
        Postulacion.count({
            where: {
                id_vacante_fk: id,
                activo: 1
            },
        })
        .then((numPostulaciones) => {
            return resolve(numPostulaciones);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPerfilesUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: ["id_usuario"],
            include: {
                model: Perfil,
            },
        })
        .then((usuario) => {
            return resolve(usuario.Perfiles);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    getVacantes,
    getVacantesFilter,
    getVacante,
    getVacantesEmpresa,
    addVacante,
    deleteVacante,
    updateVacante,
    deleteVacante,
    publicarVacante,
    noPublicarVacante,
    cerrarVacante,
    abrirVacante,
    getPostulantes,
    getPostulaciones,
    getPerfilesUsuario,
};