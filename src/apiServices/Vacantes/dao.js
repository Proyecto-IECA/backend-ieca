const Vacante = require("../../services/mysql/models/Vacantes");
const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");

const getVacantes = async() => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            where: {
                activo: 1,
            },
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
        Vacante.findByPk(id_vacante)
        .then((vacante) => {
            return resolve(vacante);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVacantesEmpresa = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            where: {
                id_usuario_fk: id_usuario,
            },
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

const getPostulantes = async(id) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id, {
            attributes: ["id_vacante"],
            include: [{
                model: Postulacion,
                attributes: ["id_postulacion"],
                include: [{
                    model: Usuario,
                    attributes: ["id_usuario", "email", "telefono", "calificacion", "ciudad"],
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
    getPostulantes,
};