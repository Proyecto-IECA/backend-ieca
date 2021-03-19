const { queryParams } = require("../../../dal/data-access");
const VistaVacante = require('../../models/vista_vacantes');

const addVistaVacante = async(req, res) => {
    const { id_vacante, id_postulante } = req.body;

    const mysqlParams = [id_vacante, id_postulante];

    let resulQuery = await queryParams("stp_add_vista_vacante(?, ?)", mysqlParams);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al registrar la vacante",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Exito al registrar la vista a la vacante",
        data: "Yei",
    });
};

module.exports = {
    addVistaVacante,
};