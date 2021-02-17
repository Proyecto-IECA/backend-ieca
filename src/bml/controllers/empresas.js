const { query, queryParams } = require('../../dal/data-access');

const getAllEmpresa = async(req, res) => {
    let empresas = await query('stp_getall_empresa()');
    if (empresas[0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: empresas[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

const getEmpresaid = async(req, res) => {
    const { id } = req.params;
    const mysqlParams = [
        id_empresa = id
    ];
    let empresas = await queryParams('stp_getbyid_empresa(?)', mysqlParams);
    if (empresas[0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: empresas[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

const updateEpresa = async(req, res) => {
    const { id } = req.params;
    const {
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro
    } = req.body;
    const mysqlParams = [
        id_empresa = id,
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro
    ];
    let result = await queryParams('stp_update_empresa(?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);
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

const deleteEmpresa = async(req, res) => {
    const { id } = req.params;
    const mysqlParams = [
        id_empresa = id
    ];
    let result = await queryParams('stp_delete_empresa(?)', mysqlParams);
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
    getAllEmpresa,
    getEmpresaid,
    updateEpresa,
    deleteEmpresa
};