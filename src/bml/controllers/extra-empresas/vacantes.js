const { queryParams } = require("../../../dal/data-access");
const Vacante = require("../../models/vacantes");

const addVacante = async(req, res) => {
    const { puesto, imagen, sueldo, descripcion, id_empresa } = req.body;

    const mysqlParams = [puesto, imagen, sueldo, descripcion, id_empresa];

    let resultQuery = await queryParams(
        "stp_add_vacante(?, ?, ?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al publicar la vacante",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Se publico de manera exitosa la vacante",
        data: "Si",
    });
};

module.exports = {
    addVacante,
};