const Perfil = require("../../services/mysql/models/Perfiles");
const Usuario = require("../../services/mysql/models/Usuarios");

const getPerfiles = async() => {
    return new Promise((resolve, reject) =>
        Perfil.findAll()
        .then((perfiles) => {
            return resolve(perfiles);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPerfilesUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .getPerfiles()
                .then((perfiles) => {
                    return resolve(perfiles);
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

const addPerfil = async(descripcion, id_usuario) => {
    return new Promise((resolve, reject) =>
        Perfil.findOne({
            where: {
                descripcion: descripcion,
            },
        })
        .then((perfil) => {
            if (perfil) {
                perfil.addUsuario(id_usuario);
                return resolve(perfil);
            }

            Perfil.create({
                    descripcion: descripcion,
                })
                .then((perfil) => {
                    perfil.addUsuario(id_usuario);
                    return resolve(perfil);
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

const deletePerfiles = async(id_usuario, perfiles) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .removePerfiles(perfiles)
                .then((result) => {
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
    getPerfiles,
    getPerfilesUsuario,
    addPerfil,
    deletePerfiles,
};