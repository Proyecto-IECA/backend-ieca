const { queryParams } = require("../../../dal/data-access");
const ExperienciaAcademica = require("../../models/experiencia_academica");
const moment = require("moment");

const addExperienciaAcademica = async(req, res) => {
    const {
        nivel,
        institucion,
        carrera,
        anio_entrada,
        anio_salida,
        estudiando,
        id_postulante,
    } = req.body;

    let anio = moment(anio_entrada);
    let a_entrada = anio.format('YYYY');
    let a_salida = '';
    if (anio_salida) {
        let anio2 = moment(anio_salida);
        a_salida = anio2.format('YYYY');
    }


    const mysqlParams = [
        nivel,
        institucion,
        carrera,
        a_entrada,
        a_salida,
        estudiando,
        id_postulante,
    ];

    let resultQuery = await queryParams(
        "stp_add_experiencia_academica(?, ?, ?, ?, ?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al registrar la experiencia academica",
            data: null,
        });
    }

    const mysqlParam = [id_postulante];

    let experienciasAcademicas = new ExperienciaAcademica();
    resultQuery = await queryParams(
        "stp_getbyid_experiencias_academicas(?)",
        mysqlParam
    );
    experienciasAcademicas = resultQuery[0];

    res.json({
        status: true,
        message: "Se registro de manera exitosa la experiencia academica",
        data: experienciasAcademicas,
    });
};

const updateExperienciaAcademica = async(req, res) => {
    const { id } = req.params;
    const {
        nivel,
        institucion,
        carrera,
        anio_entrada,
        anio_salida,
        estudiando,
        id_postulante,
    } = req.body;

    let anio = moment(anio_entrada);
    let a_entrada = anio.format('YYYY');
    let a_salida = '';
    if (anio_salida) {
        let anio2 = moment(anio_salida);
        a_salida = anio2.format('YYYY');
    }

    const mysqlParams = [
        (id_experiencia_academica = id),
        nivel,
        institucion,
        carrera,
        a_entrada,
        a_salida,
        estudiando,
        id_postulante,
    ];

    let resultQuery = await queryParams(
        "stp_update_experiencia_academica(?, ?, ?, ?, ?, ?, ?, ?)",
        mysqlParams
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al actualizar la experiencia academica",
            data: null,
        });
    }

    const mysqlParam = [id_postulante];

    let experienciasAcademicas = new ExperienciaAcademica();
    resultQuery = await queryParams(
        "stp_getbyid_experiencias_academicas(?)",
        mysqlParam
    );
    experienciasAcademicas = resultQuery[0];

    res.json({
        status: true,
        message: "Se registro de manera exitosa la experiencia academica",
        data: experienciasAcademicas,
    });
};

const deleteExperienciaAcademica = async(req, res) => {
    const { id_p, id } = req.params;
    const mysqlParam = [(id_experiencia_academica = id)];

    let resultQuery = await queryParams(
        "stp_delete_experiencia_academica(?)",
        mysqlParam
    );

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: "Ocurrio un error al eliminar la experiencia laboral",
            data: null,
        });
    }

    const mysqlParam2 = [(id_postulante = id_p)];

    let experienciasAcademicas = new ExperienciaAcademica();
    resultQuery = await queryParams(
        "stp_getbyid_experiencias_academicas(?)",
        mysqlParam2
    );
    experienciasAcademicas = resultQuery[0];

    res.json({
        status: true,
        message: "Se elimino de manera exitosa la experiencia academicas",
        data: experienciasAcademicas,
    });
};

module.exports = {
    addExperienciaAcademica,
    deleteExperienciaAcademica,
    updateExperienciaAcademica,
};