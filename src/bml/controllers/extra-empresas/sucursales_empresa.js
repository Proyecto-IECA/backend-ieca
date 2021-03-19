const { queryParams } = require("../../../dal/data-access");
const Sucursal = require("../../models/sucursales_empresa");

const addSucursal = async(req, res) => {
    const { id_empresa, direccion, etiqueta } = req.body;

    const mysqlParams = [id_empresa, direccion, etiqueta];

    let resultQuery = await queryParams("stp_add_sucursal(?, ?, ?)", mysqlParams);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al registrar la sucursal",
            data: null,
        });
    }

    const mysqlParam = [id_empresa];

    resultQuery = await queryParams('stp_mas_numero_sucursal(?)', mysqlParam);
    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al actualizar el numero de sucursales",
            data: null,
        });
    }

    let sucursales = new Sucursal();
    resultQuery = await queryParams("stp_getbyid_sucursales(?)", mysqlParam);
    sucursales = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al registrar la sucursal",
        data: sucursales,
    });
};

const updateSucursal = async(req, res) => {
    const { id } = req.params;

    const { id_empresa, direccion, etiqueta } = req.body;

    const mysqlParams = [(id_sucursal = id), direccion, etiqueta];

    let resultQuery = await queryParams(
        "stp_update_sucursal(?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al actualizar la sucursal",
            data: null,
        });
    }

    const mysqlParam = [id_empresa];

    let sucursales = new Sucursal();
    resultQuery = await queryParams("stp_getbyid_sucursales(?)", mysqlParam);
    sucursales = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al actualizar la sucursal",
        data: sucursales,
    });
};

const deleteSucursal = async(req, res) => {
    const { id_e, id } = req.params;

    const mysqlParams = [(id_sucursal = id)];

    let resultQuery = await queryParams("stp_delete_sucursal(?)", mysqlParams);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al borrar la sucursal",
            data: null,
        });
    }

    const mysqlParam = [(id_empresa = id_e)];

    resultQuery = await queryParams('stp_min_numero_sucursal(?)', mysqlParam);
    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al actualizar el numero de sucursales",
            data: null,
        });
    }

    let sucursales = new Sucursal();
    resultQuery = await queryParams("stp_getbyid_sucursales(?)", mysqlParam);
    sucursales = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al borrar la sucursal",
        data: sucursales,
    });
};

module.exports = {
    addSucursal,
    updateSucursal,
    deleteSucursal,
};