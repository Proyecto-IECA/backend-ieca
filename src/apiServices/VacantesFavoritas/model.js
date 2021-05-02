const vacanteFavDao = require("./dao");

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