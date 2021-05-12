const Vacante = require("../../services/mysql/models/Vacantes");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const VacanteFav = require("../../services/mysql/models/VacantesFavoritas");

const getVacantes = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            where: {
                activo: 1,
                publicada: 1
            },
            include: [{
                model: VacanteFav,
                include: [{
                    model: Usuario,
                    attributes: [],
                    where: {
                        id_usuario: id_usuario,
                    },
                }, ],
            }, ],
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
                attributes: ["id_usuario", "nombre", "pagina_web", "calificacion"],
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
        Vacante.destroy({
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
        }, {
            where: {
                id_vacante: id
            }
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
                id_vacante: id
            }
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
                id_vacante: id
            }
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
                id_vacante: id
            }
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
                attributes: ["id_postulacion", "fecha_postulacion"],
                include: [{
                    model: Usuario,
                    attributes: [
                        "id_usuario",
                        "nombre",
                        "email",
                        "telefono",
                        "calificacion",
                        "ciudad",
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

module.exports = {
    getVacantes,
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
};