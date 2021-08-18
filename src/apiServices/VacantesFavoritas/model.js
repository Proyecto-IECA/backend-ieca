const vacanteFavDao = require("./dao");

// Modelo del CRUD de vacantes favoritas
const addVacanteFav = async(vacanteFav) => {
    return vacanteFavDao.addVacanteFav(vacanteFav);
};

const deleteVacanteFav = async(id) => {
    return vacanteFavDao.deleteVacanteFav(id);
};

const getVacantesFav = async(id_usuario) => {
    return vacanteFavDao.getVacantesFav(id_usuario);
};

module.exports = {
    addVacanteFav,
    deleteVacanteFav,
    getVacantesFav,
};