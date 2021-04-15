const Sucursal = require("../../services/mysql/models/Sucursales");

const getSucursales = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Sucursal.findAll({
            where: {
                id_usuario_fk: id_usuario,
            },
        })
        .then((sucursales) => {
            return resolve(sucursales);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const addSucursal = async(sucursal) => {
    return new Promise((resolve, reject) =>
        Sucursal.create(sucursal)
        .then((sucursal) => {
            return resolve(sucursal);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const updateSucursal = async(id, sucursal) => {
    return new Promise((resolve, reject) =>
        Sucursal.update(sucursal, {
            where: {
                id_sucursal: id,
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

const deleteSucursal = async(id) => {
    return new Promise((resolve, reject) =>
        Sucursal.destroy({
            where: {
                id_sucursal: id,
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
    getSucursales,
    addSucursal,
    updateSucursal,
    deleteSucursal,
};