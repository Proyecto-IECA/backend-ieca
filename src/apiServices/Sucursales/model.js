const sucursalDao = require("./dao");

// Modelo del CRUD de sucursales
const getSucursales = async(id_usuario) => {
    return sucursalDao.getSucursales(id_usuario);
};

const addSucursal = async(sucursal) => {
    return sucursalDao.addSucursal(sucursal);
};

const updateSucursal = async(id, sucursal) => {
    return sucursalDao.updateSucursal(id, sucursal);
};

const deleteSucursal = async(id) => {
    return sucursalDao.deleteSucursal(id);
};

module.exports = {
    getSucursales,
    addSucursal,
    updateSucursal,
    deleteSucursal,
};