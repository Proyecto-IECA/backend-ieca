const Habilidad = require("../../services/mysql/models/Habilidades");
const Usuario = require("../../services/mysql/models/Usuarios");

// Capa de acceso para obtener el CRUD de habilidades
const getHabilidades = async() => {
    return new Promise((resolve, reject) =>
        Habilidad.findAll()
        .then((habilidades) => {
            return resolve(habilidades);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getHabilidadesUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .getHabilidades()
                .then((habilidades) => {
                    return resolve(habilidades);
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

const addHabilidad = async(descripcion, id_usuario) => {
    return new Promise((resolve, reject) =>
        Habilidad.findOne({
            where: {
                descripcion: descripcion,
            },
        })
        .then((habilidad) => {
            if (habilidad) {
                habilidad.addUsuario(id_usuario);
                return resolve(habilidad);
            }

            Habilidad.create({
                    descripcion: descripcion,
                })
                .then((habilidad) => {
                    habilidad.addUsuario(id_usuario);
                    return resolve(habilidad);
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

const deleteHabilidades = async(id_usuario, habilidades) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .removeHabilidades(habilidades)
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
    getHabilidades,
    getHabilidadesUsuario,
    addHabilidad,
    deleteHabilidades
};