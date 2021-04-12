const ExpAcademica = require("../../services/mysql/models/ExperienciasAcademicas");

const getExpAcademicas = async(id) => {
    return new Promise((resolve, reject) =>
        ExpAcademica.findAll({
            where: {
                id_usuario_fk: id
            }
        })
        .then((expAcademicas) => {
            return resolve(expAcademicas);
        })
        .catch((err) => {
            return reject(err);
        })
    )
}

const addExpAcademica = async(expAcademica) => {
    return new Promise((resolve, reject) =>
        ExpAcademica.create(expAcademica)
        .then((expAcademica) => {
            return resolve(expAcademica);
        })
        .catch((err) => {
            return reject(err);
        })
    )
}

const updateExpAcademica = async(id, expAcademica) => {
    return new Promise((resolve, reject) =>
        ExpAcademica.update(expAcademica, {
            where: {
                id_experiencia_academica: id
            }
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    )
}

const deleteExpAcademica = async(id) => {
    return new Promise((resolve, reject) =>
        ExpAcademica.destroy({
            where: {
                id_experiencia_academica: id
            }
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    )
}