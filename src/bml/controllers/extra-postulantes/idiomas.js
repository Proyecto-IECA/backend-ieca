//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../../dal/data-access');

const getallIdiomas = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let perfil = await query('stp_getall_idioma()');

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

const addIdiomas = async(req, res) => {
    const {
        descripcion,
        nivel,
        id_postulante
    } = req.body;

    const mysqlParam = [
        descripcion,
        nivel,
        id_postulante
    ];

    let result = await queryParams('stp_add_idiomas_postulante(?, ?, ?)', mysqlParam);

    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'Idioma agregado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el Idioma',
            data: null
        });
    }
}

const deleteIdiomas = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_empresa = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_delete_idioma_postulantes(?)', mysqlParams);
    //Se verifica si los renglones afectados de la BD son diferentes de cero
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: 'idioma eliminada correctamente',
            data: result.affectedRows
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el idioma',
            data: result.affectedRows
        })
    }
}


module.exports = {
    getallIdiomas,
    addIdiomas,
    deleteIdiomas
}