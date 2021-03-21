const { queryParams } = require("../../../dal/data-access");
const PerfilVacante = require("../../models/perfil_vacante");

const getPerfilesVacante = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [(id_vacante = id)];

    resultQuery = await queryParams(
        "stp_getbyid_perfiles_vacante(?)",
        mysqlParam
    );

    //Se obtienen los perfiles de la vacante
    let perfilesVacante = new PerfilVacante();
    perfilesVacante = resultQuery[0];

    res.json({
        status: false,
        message: "Exito al obtener los perfiles",
        data: perfilesVacante
    });
};

const addPerfiles = async(req, res) => {
    const { id_vacante, perfiles } = req.body;

    const mysqlParam = [id_vacante];

    await queryParams("stp_delete_perfiles_vacante(?)", mysqlParam);

    perfiles.forEach(async(perfil) => {
        let mysqlParams = [perfil.descripcion, perfil.id_vacante];

        await queryParams("stp_add_perfil_vacante(?,?)", mysqlParams);
    });

    resultQuery = await queryParams(
        "stp_getbyid_perfiles_vacante(?)",
        mysqlParam
    );

    //Se obtienen los perfiles del vacante
    let perfilesVacante = new PerfilVacante();
    perfilesVacante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener los perfiles",
        data: perfilesVacante
    });
};

module.exports = {
    getPerfilesVacante,
    addPerfiles
};