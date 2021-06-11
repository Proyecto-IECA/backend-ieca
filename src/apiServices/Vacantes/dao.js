const Vacante = require("../../services/mysql/models/Vacantes");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const VacanteFav = require("../../services/mysql/models/VacantesFavoritas");
const Perfil = require("../../services/mysql/models/Perfiles");

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

const getVacante = async(id_vacante) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id_vacante, {
            include: [{
                model: Usuario,
                attributes: ["id_usuario", "nombre", "pagina_web", "foto_perfil", "ubicacion"],
            }, ],
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
            fecha_publicacion: new Date(Date.now()),
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
            attributes: ["id_vacante"],
            include: [{
                model: Postulacion,
                attributes: [
                    "id_postulacion",
                    "fecha_postulacion",
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