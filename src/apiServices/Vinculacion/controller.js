const vinculacionModel = require("./model");
const vinculacionDto = require("../shared/dto");

// Función para vincular una cuenta de IECA
const vinculacionCuenta = async(req, res) => {
    await vinculacionModel
        .vinculacionCuenta(req.params.curp)
        .then((users) => {
            if (users.length > 0) {
                return res.json(
                    vinculacionDto.normally(true, "Si se encontro la cuenta")
                );
            }
            return res.json(vinculacionDto.normally(false, 'No se encontro la cuenta'));

        })
        .catch((err) => {
            return res.json(vinculacionDto.normally(false, err));
        });
};

module.exports = {
    vinculacionCuenta,
};