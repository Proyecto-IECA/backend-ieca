const vinculacionModel = require("./dao");

const vinculacionCuenta = async(CURP) => {
    return vinculacionModel.querySingle(CURP);
};

module.exports = {
    vinculacionCuenta,
};