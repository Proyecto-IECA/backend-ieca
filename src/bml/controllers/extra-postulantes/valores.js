//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../../dal/data-access');

const getallValores = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let perfil = await query('stp_getall_valores()');

    //Se verifica si la respuesta devolvio algo para retornar los postulante
    if (perfil[0]) {
        res.json({
            status: true,
            message: 'Consulta Exitosa',
            data: perfil[0]
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }
}

const addValores = async(req, res) => {
    const {
        descripcion,
        id_postulante
    } = req.body;

    const mysqlParam = [
        descripcion,
        id_postulante
    ];

    let result = await queryParams('stp_add_valores_postulantes(?, ?)', mysqlParam);

    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'valores agregado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar los valores',
            data: null
        });
    }
}

const deleteValores = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_empresa = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_delete_valores_postulante(?)', mysqlParams);
    //Se verifica si los renglones afectados de la BD son diferentes de cero
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'valor eliminado correctamente',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar los valores',
            data: result.affectedRows
        })
    }
}

module.exports = {
    getallValores,
    addValores,
    deleteValores
}