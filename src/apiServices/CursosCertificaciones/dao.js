const CursoCert = require("../../services/mysql/models/CursosCertificaciones");

const getCursosCert = async(id) => {
    return new Promise((resolve, reject) =>
        CursoCert.findAll({
            where: {
                id_usuario_fk: id,
            },
        })
        .then((cursosCert) => {
            return resolve(cursosCert);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addCursoCert = async(cursoCert) => {
    return new Promise((resolve, reject) =>
        CursoCert.create(cursoCert)
        .then((cursoCert) => {
            return resolve(cursoCert);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};
const updateCursoCert = async(id, cursoCert) => {
    return new Promise((resolve, reject) =>
        CursoCert.update(cursoCert, {
            where: {
                id_curso_certificacion: id,
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

const deleteCursoCert = async(id) => {
    return new Promise((resolve, reject) =>
        CursoCert.destroy({
            where: {
                id_curso_certificacion: id,
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
    getCursosCert,
    addCursoCert,
    updateCursoCert,
    deleteCursoCert,
};