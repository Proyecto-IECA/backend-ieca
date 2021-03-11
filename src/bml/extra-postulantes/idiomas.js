//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../dal/data-access');

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


module.exports = {
    getallIdiomas,
    addIdiomas,
}