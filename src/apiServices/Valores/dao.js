const Valor = require("../../services/mysql/models/Valores");
const Usuario = require("../../services/mysql/models/Usuarios");

// Capa de acceso para el CRUD de valores
const getValores = async() => {
    return new Promise((resolve, reject) =>
        Valor.findAll()
        .then((valores) => {
            return resolve(valores);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getValoresUsuario = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .getValores()
                .then((valores) => {
                    return resolve(valores);
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

const addValor = async(descripcion, id_usuario) => {
    return new Promise((resolve, reject) =>
        Valor.findOne({
            where: {
                descripcion: descripcion,
            },
        })
        .then((valor) => {
            if (valor) {
                valor.addUsuario(id_usuario);
                return resolve(valor);
            }

            Valor.create({
                    descripcion: descripcion,
                })
                .then((valor) => {
                    valor.addUsuario(id_usuario);
                    return resolve(valor);
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

const deleteValores = async(id_usuario, valores) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario)
        .then((usuario) => {
            usuario
                .removeValores(valores)
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
    getValores,
    getValoresUsuario,
    addValor,
    deleteValores
};