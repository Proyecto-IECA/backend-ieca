const Vacante = require("../../services/mysql/models/Vacantes");

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

module.exports = {
    getVacantes,
    getVacantesEmpresa,
    addVacante,
    deleteVacante,
    updateVacante,
    deleteVacante,
};