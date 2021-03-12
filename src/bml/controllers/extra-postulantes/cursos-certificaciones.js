const { queryParams } = require('../../../dal/data-access');
const CursoCertificacion = require('../../models/curso_certificacion');

const addCursoCertificacion = async(req, res) => {
    const {
        nombre,
        descripcion,
        constancia,
        link,
        id_postulante
    } = req.body;

    const mysqlParams = [
        nombre,
        descripcion,
        constancia,
        link,
        id_postulante
    ];

    let resulQuery = await queryParams('stp_add_curso_certificacion(?, ?, ?, ?, ?)', mysqlParams);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al registrar el curso',
            data: null
        });
    }

    const mysqlParam = [
        id_postulante
    ];

    //Se obtienen los cursos y certificaciones del postulante
    let cursosCertificaciones = new CursoCertificacion();
    resultQuery = await queryParams('stp_getbyid_cursos_certificaciones(?)', mysqlParam);
    cursosCertificaciones = resultQuery[0];

    res.json({
        status: true,
        message: 'Se registro de manera exitosa el curso',
        data: cursosCertificaciones
    });
}

const updateCursoCertificacion = async(req, res) => {
    const { id } = req.params;
    const {
        nombre,
        descripcion,
        constancia,
        link,
        id_postulante
    } = req.body;

    const mysqlParams = [
        id_curso_certificacion = id,
        nombre,
        descripcion,
        constancia,
        link
    ];

    let resulQuery = await queryParams('stp_update_curso_certificacion(?, ?, ?, ?, ?)', mysqlParams);

    if (resulQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el curso',
            data: null
        });
    }

    const mysqlParam = [
        id_postulante
    ];

    //Se obtienen los cursos y certificaciones del postulante
    let cursosCertificaciones = new CursoCertificacion();
    resultQuery = await queryParams('stp_getbyid_cursos_certificaciones(?)', mysqlParam);
    cursosCertificaciones = resultQuery[0];

    res.json({
        status: true,
        message: 'Se actualizo de manera exitosa el curso',
        data: cursosCertificaciones
    });
}

const deleteCursoCertificacion = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [
        id_curso_certificacion = id
    ];

    let resultQuery = await queryParams('stp_delete_curso_certificacion(?)', mysqlParam);

    if (resultQuery.affectedRows == 0) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el curso',
            data: null
        });
    }

    const { id_postulante } = req.body;

    const mysqlParam2 = [
        id_postulante
    ];

    //Se obtienen los cursos y certificaciones del postulante
    let cursosCertificaciones = new CursoCertificacion();
    resultQuery = await queryParams('stp_getbyid_cursos_certificaciones(?)', mysqlParam2);
    cursosCertificaciones = resultQuery[0];

    res.json({
        status: true,
        message: 'Se elimino de manera exitosa el curso',
        data: cursosCertificaciones
    });
}

module.exports = {
    addCursoCertificacion,
    deleteCursoCertificacion,
    updateCursoCertificacion
}