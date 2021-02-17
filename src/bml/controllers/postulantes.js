const { query, queryParams } = require('../../dal/data-access');

const getPostulantes = async(req, res) => {
    let postulantes = await query('stp_getall_postulante()');
    if (postulantes[0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: postulantes[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

const getPostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParams = [
        id_postulante = id
    ];
    let postulante = await queryParams('stp_getbyid_postulante(?)', mysqlParams);
    if (postulante[0][0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: postulante[0][0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

const updatePostulante = async(req, res) => {
    const { id } = req.params;
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        telefono_casa,
        telefono_celular,
        pais,
        codigo_postal,
        ciudad,
        domicilio,
        foto_perfil,
        cv,
    } = req.body;
    const mysqlParams = [
        id_postulante = id,
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        sexo,
        telefono_casa,
        telefono_celular,
        pais,
        codigo_postal,
        ciudad,
        domicilio,
        foto_perfil,
        cv,
    ];
    let result = await queryParams('stp_update_postulante(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'Cuenta actualizada de manera exitosa',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la cuenta',
            data: result.affectedRows
        });
    }
}

const deletePostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParams = [
        id_postualnte = id
    ];
    let result = await queryParams('stp_delete_postulante(?)', mysqlParams);
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'Cuenta eliminada correctamente',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar la cuenta',
            data: result.affectedRows
        })
    }
}


module.exports = {
    getPostulantes,
    getPostulante,
    updatePostulante,
    deletePostulante,
};