const { queryParams } = require("../../../dal/data-access");
const Vacante = require("../../models/vacantes");
const PerfilVacante = require("../../models/perfil_vacante");

const getVacantesEmpresa = async(req, res) => {
    const { id } = req.params;

    const mysqlParam = [(id_empresa = id)];

    let resultQuery = await queryParams(
        "stp_getall_vacantes_empresa(?)",
        mysqlParam
    );

    if (!resultQuery[0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al consultar las vacantes",
            data: null,
        });
    }

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Consulta exitosa",
        data: vacantes,
    });
};

const getVacante = async(req, res) => {
    const { id } = req.params;

    const mysqlParam = [(id_vacante = id)];

    let resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam);

    if (!resultQuery[0][0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al consultar la vacante",
            data: null,
        });
    }

    let vacante = new Vacante();
    vacante = resultQuery[0][0];

    //Se obtienen los perfiles de la vacantes
    let perfilesVacante = new PerfilVacante();
    resultQuery = await queryParams(
        "stp_getbyid_perfiles_vacante(?)",
        mysqlParam
    );
    perfilesVacante = resultQuery[0];

    vacante.perfiles_vacante = perfilesVacante;

    res.json({
        status: true,
        message: "Consulta Exitosa",
        data: vacante,
    });
};

const addVacante = async(req, res) => {
    const {
        puesto,
        sueldo,
        descripcion,
        id_empresa,
        id_sucursal,
        modalidad,
        nivel,
    } = req.body;

    const mysqlParams = [
        puesto,
        sueldo,
        descripcion,
        id_empresa,
        id_sucursal,
        modalidad,
        nivel,
    ];

    let resultQuery = await queryParams(
        "stp_add_vacante(?, ?, ?, ?, ?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al publicar la vacante",
            data: null,
        });
    }

    const mysqlParam = [id_empresa];

    resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam);

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Se publico de manera exitosa la vacante",
        data: vacantes,
    });
};

const updateVacante = async(req, res) => {
    const { id } = req.params;

    const {
        puesto,
        sueldo,
        descripcion,
        id_sucursal,
        modalidad,
        nivel,
        id_empresa,
    } = req.body;

    const mysqlParams = [
        (id_vacante = id),
        puesto,
        sueldo,
        descripcion,
        id_sucursal,
        modalidad,
        nivel,
    ];

    let resultQuery = await queryParams(
        "stp_update_vacante(?, ?, ?, ?, ?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al actualizar la vacante",
            data: null,
        });
    }

    const mysqlParam = [id_empresa];

    resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam);

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Se publico de manera exitosa la vacante",
        data: vacantes,
    });
};

const updateImagenVacante = async(req, res) => {
    const { id } = req.params;

    const { imagen } = req.body;

    const mysqlParams = [(id_vacante = id), imagen];

    let resulQuery = await queryParams(
        "stp_update_foto_vacante(?, ?)",
        mysqlParams
    );

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al cargar la foto",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Exito al cargar la foto",
        data: resulQuery[0][0],
    });
};

const deleteVacante = async(req, res) => {
    const { id_e, id } = req.params;

    const mysqlParam = [(id_vacante = id)];

    let resultQuery = await queryParams("`stp_delete_vacante", mysqlParam);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al borrar la vacante",
            data: null,
        });
    }

    const mysqlParam2 = [(id_empresa = id_e)];

    resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam2);

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Se publico de manera exitosa la vacante",
        data: vacantes,
    });
};

const desactivarVacante = async(req, res) => {
    const { id_e, id } = req.params;

    const mysqlParam = [id];

    let resulQuery = await queryParams("stp_desactivar_vacante", mysqlParam);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al desactivar la vacante",
            data: null,
        });
    }

    const mysqlParam2 = [(id_empresa = id_e)];

    resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam2);

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Se desactivo de manera exitosa la vacante",
        data: vacantes,
    });
};

const activarVacante = async(req, res) => {
    const { id_e, id } = req.params;

    const mysqlParam = [id];

    let resulQuery = await queryParams("stp_activar_vacante", mysqlParam);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Error al activar la vacante",
            data: null,
        });
    }

    const mysqlParam2 = [(id_empresa = id_e)];

    resultQuery = await queryParams("stp_getbyid_vacante(?)", mysqlParam2);

    let vacantes = new Vacante();
    vacantes = resultQuery[0];

    res.json({
        status: true,
        message: "Se activo de manera exitosa la vacante",
        data: vacantes,
    });
};

module.exports = {
    getVacantesEmpresa,
    getVacante,
    addVacante,
    updateVacante,
    updateImagenVacante,
    deleteVacante,
    desactivarVacante,
    activarVacante,
};