const { queryParams } = require('../../dal/data-access');
const ExperienciaLaboral = require('../models/experiencia_laboral');

const addExperienciaLaboral = async(req, res) => {
    const {
        puesto,
        empresa,
        actividades,
        fecha_entrada,
        fecha_salida,
        trabajando,
        id_postulante
    } = req.body;

    const mysqlParams = [
        puesto,
        empresa,
        actividades,
        fecha_entrada,
        fecha_salida,
        trabajando,
        id_postulante
    ];

    let resultQuery = await queryParams('stp_add_experiencia_laboral(?, ?, ?, ?, ?, ?, ?)', mysqlParams);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'ocurrio un error al registrar la experiencia laboral',
            data: null
        });
    }

    const mysqlParam = [
        id_postulante
    ];

    let experienciasLaborales = new ExperienciaLaboral();
    resultQuery = await queryParams('stp_getbyid_experiencias_laborales(?)', mysqlParam);
    experienciasLaborales = resultQuery[0];

    res.json({
        status: true,
        message: 'Se registro de manera exitosa la experiencia laboral',
        data: experienciasLaborales
    });
}

const updateExperienciaLaboral = async(req, res) =>  {
    const { id } = req.params;
    const {
        puesto,
        empresa,
        actividades,
        fecha_entrada,
        fecha_salida,
        trabajando,
        id_postulante
    } = req.body;

    const mysqlParams = [
        id_experiencia_laboral = id,
        puesto,
        empresa,
        actividades,
        fecha_entrada,
        fecha_salida,
        trabajando,
        id_postulante
    ];

    let resulQuery = await queryParams('stp_update_experiencia_laboral(?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la experiencia laboral',
            data: null
        });
    }

    const mysqlParam = [
        id_postulante
    ];

    let experienciasLaborales = new ExperienciaLaboral();
    resultQuery = await queryParams('stp_getbyid_experiencias_laborales(?)', mysqlParam);
    experienciasLaborales = resultQuery[0];

    res.json({
        status: true,
        message: 'Se actualizo de manera exitosa la experiencia laboral',
        data: experienciasLaborales
    });
}

const deleteExperienciaLaboral = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [
        id_experiencia_laboral = id
    ];

    let resultQuery = await queryParams('stp_delete_experiencia_laboral(?)', mysqlParam);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al eliminar la experiencia laboral',
            data: null
        });
    }

    const { id_postulante } = req.body;
    const mysqlParam2 = [
        id_postulante
    ];

    let experienciasLaborales = new ExperienciaLaboral();
    resultQuery = await queryParams('stp_getbyid_experiencias_laborales(?)', mysqlParam2);
    experienciasLaborales = resultQuery[0];

    res.json({
        status: true,
        message: 'Se elimino de manera exitosa la experiencia laboral',
        data: experienciasLaborales
    });

}

module.exports = {
    addExperienciaLaboral,
    deleteExperienciaLaboral,
    updateExperienciaLaboral
}