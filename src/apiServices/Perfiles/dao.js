const Perfil = require("../../services/mysql/models/Perfiles");
const Usuario = require("../../services/mysql/models/Usuarios");
const Vacante = require("../../services/mysql/models/Vacantes");

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

const getPerfilesVacante = async(id_vacante) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id_vacante)
        .then((vacante) => {
            vacante
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

const addPerfilVacante = (descripcion, id_vacante) => {
    return new Promise((resolve, reject) =>
        Perfil.findOne({
            where: {
                descripcion: descripcion,
            },
        })
        .then((perfil) => {
            if (perfil) {
                perfil.addVacante(id_vacante);
                return resolve(perfil);
            }

            Perfil.create({
                    descripcion: descripcion,
                })
                .then((perfil) => {
                    perfil.addVacante(id_vacante);
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

const deletePerfilesVacante = async(id_vacante, perfiles) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id_vacante)
        .then((vacante) => {
            vacante
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
    getPerfilesVacante,
    addPerfilVacante,
    deletePerfilesVacante,
};