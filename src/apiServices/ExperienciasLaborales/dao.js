const ExpLaboral = require("../../services/mysql/models/ExperienciasLaborales");

const getExpLaborales = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        ExpLaboral.findAll({
            where: {
                id_usuario_fk: id_usuario,
            },
        })
        .then((expLaborales) => {
            return resolve(expLaborales);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addExpLaboral = async(expLaboral) => {
    return new Promise((resolve, reject) =>
        ExpLaboral.create(expLaboral)
        .then((expLaboral) => {
            return resolve(expLaboral);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const updateExpLaboral = async(id, expLaboral) => {
    return new Promise((resolve, reject) =>
        ExpLaboral.update(expLaboral, {
            where: {
                id_experiencia_laboral: id,
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

const deleteExpLaboral = async(id) => {
    return new Promise((resolve, reject) =>
        ExpLaboral.destroy({
            where: {
                id_experiencia_laboral: id,
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

const updateTrabajando = async(id) => {
    return new Promise((resolve, reject) =>
        ExpLaboral.update({ trabajando: 0 }, {
            where: {
                id_usuario_fk: id,
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
    getExpLaborales,
    addExpLaboral,
    updateExpLaboral,
    deleteExpLaboral,
    updateTrabajando,
};