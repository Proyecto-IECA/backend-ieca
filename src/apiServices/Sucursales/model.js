const sucursal = require("./dao");

const getSucursales = async(id_usuario) => {
    return sucursal.getSucursales(id_usuario);
};

const addSucursal = async(sucursal) => {
    return sucursal.addSucursal(sucursal);
};

const updateSucursal = async(id, sucursal) => {
    return sucursal.updateSucursal(id, sucursal);
};

const deleteSucursal = async(id) => {
    return sucursal.deleteSucursal(id);
};

module.exports = {
    getSucursales,
    addSucursal,
    updateSucursal,
    deleteSucursal,
};