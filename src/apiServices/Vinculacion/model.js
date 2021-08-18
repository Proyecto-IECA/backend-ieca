const vinculacionModel = require("./dao");

// Modelo para la vinculación de una cuenta de IECA
const vinculacionCuenta = async(CURP) => {
    return vinculacionModel.querySingle(CURP);
};

module.exports = {
    vinculacionCuenta,
};