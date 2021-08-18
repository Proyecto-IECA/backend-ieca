const Idioma = require("../../services/mysql/models/Idiomas");
const Usuario = require("../../services/mysql/models/Usuarios");

// Capa de acceso para obtener el CRUD de habilidades
const getIdiomas = async() => {
    return new Promise((resolve, reject) =>
        Idioma.findAll()
        .then((idiomas) => {
            return resolve(idiomas);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getIdiomasUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .getIdiomas()
                .then((idiomas) => {
                    return resolve(idiomas);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addIdioma = async(descripcion, id_usuario) => {
    console.log(descripcion, id_usuario);
    return new Promise((resolve, reject) =>
        Idioma.findOne({
            where: {
                descripcion: descripcion,
            },
        })
        .then((idioma) => {
            if (idioma) {
                idioma.addUsuario(id_usuario);
                return resolve(idioma);
            }

            Idioma
                .create({
                    descripcion: descripcion,
                })
                .then((idioma) => {
                    idioma.addUsuario(id_usuario);
                    return resolve(idioma);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const deleteIdiomas = async(id_usuario, idiomas) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .removeIdiomas(idiomas)
                .then((result) => {
                    console.log(result);
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    getIdiomas,
    getIdiomasUsuario,
    addIdioma,
    deleteIdiomas,
};