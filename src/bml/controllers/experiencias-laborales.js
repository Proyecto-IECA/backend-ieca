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

    if (!resultQuery[0]) {
        return res.json({
            status: false,
            message: 'ocurrio un error al registrar la experiencia laboral',
            data: null
        });
    }

    let experienciasLaborales = new ExperienciaLaboral();
    experienciasLaborales = resultQuery[0];

    res.json({
        status: true,
        message: 'Se registro de manera exitosa la experiencia laboral',
        data: experienciasLaborales
    });
}

module.exports = {
    addExperienciaLaboral
}