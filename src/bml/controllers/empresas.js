//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../dal/data-access');

//Funcion para obtener todos las empresas
const getEmpresas = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresas = await query('stp_getall_empresa()');
    //Se verifica si la respuesta devolvio algo para retornas las empresas
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

//Funcion para obtener una empresa a traves de su id
const getEmpresa = async(req, res) => {
    //Se crea una constante que sera el id y se recibira por params de nuestro endpoint
    const { id } = req.params;
    /*Se crea una constante con los parametros para ejecutar el procedimiento almacenado para 
    obtner la empresa de la BD*/
    const mysqlParams = [
        id_empresa = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams('stp_getbyid_empresa(?)', mysqlParams);
    //Se verifica si la respuesta devolvio algo para retornar una empresa
    if (empresa[0][0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: empresa[0][0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

//Funcion para actualizar el perfil de la empresa
const updateEmpresa = async(req, res) => {
    //Se crea una constante que sera el id y se recibira por params de nuestro endpoint
    const { id } = req.params;
    /*Se crea una constante con los atributos que se van a actualizar de la empresa por medio
    del body de nuestro endpoints*/
    const {
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro
    } = req.body;
    /*Se crea una constante con todos los parametros necesarios para actualizar la informacion 
    de la empresa en la BD*/
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

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_update_empresa(?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);
    //Se verifica si los renglones afectados de la BD son diferentes de cero
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'Informacion actualizada de manera exitosa',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la informacion',
            data: result.affectedRows
        });
    }
}

//Funcion para dar de baja la empresa
const deleteEmpresa = async(req, res) => {
    //Se crea una constante que sera el id y se recibira por params de nuestro endpoint
    const { id } = req.params;
    /*Se crea una constante con los parametros para ejecutar el procedimiento almacenado para 
    borrar la empresa de la BD*/
    const mysqlParams = [
        id_empresa = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_delete_empresa(?)', mysqlParams);
    //Se verifica si los renglones afectados de la BD son diferentes de cero
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

//Exportamos las funciones para utilizar en nuestros endpoints
module.exports = {
    getEmpresas,
    getEmpresa,
    updateEmpresa,
    deleteEmpresa
};