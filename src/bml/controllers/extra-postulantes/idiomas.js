//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require("../../../dal/data-access");
const IdiomaPostulante = require("../../models/idioma_postulante");

const getIdiomas = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let idiomas = await query("stp_getall_idiomas()");

    //Se verifica si la respuesta devolvio algo para retornar los postulante
    if (!idiomas[0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al realizar la consulta",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Consulta Exitosa",
        data: idiomas[0],
    });
};

const getIdiomasPostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [(id_postulante = id)];

    resultQuery = await queryParams(
        "stp_getbyid_idiomas_postulante(?)",
        mysqlParam
    );

    //Se obtienen los idiomas del postulante
    let idiomasPostulante = new IdiomaPostulante();
    idiomasPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener los idiomas",
        data: idiomasPostulante,
    });
};

const addIdiomas = async(req, res) => {
    const { id_postulante, idiomas } = req.body;

    const mysqlParam = [id_postulante];

    await queryParams("stp_delete_idiomas_postulante(?)", mysqlParam);

    idiomas.forEach(async(idioma) => {
        let mysqlParams = [idioma.descripcion, idioma.id_postulante];

        await queryParams("stp_add_idioma_postulante(?, ?)", mysqlParams);
    });

    resultQuery = await queryParams(
        "stp_getbyid_idiomas_postulante(?)",
        mysqlParam
    );

    //Se obtienen los idiomas del postulante
    let idiomasPostulante = new IdiomaPostulante();
    idiomasPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener las idiomas",
        data: idiomasPostulante,
    });
};

// const deleteIdiomas = async(req, res) => {
//     //Se crea una constante con el atributo de los params de nuetra peticion
//     const { id } = req.params;
//     //Creamos una constante con los parametros para el procedimiento almacenado
//     const mysqlParams = [
//         id_empresa = id
//     ];

//     //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
//     let result = await queryParams('stp_delete_idioma_postulantes(?)', mysqlParams);
//     //Se verifica si los renglones afectados de la BD son diferentes de cero
//     if (result.affectedRows != 0) {
//         res.json({
//             status: true,
//             message: 'idioma eliminada correctamente',
//             data: result.affectedRows
//         });
//     } else {
//         res.json({
//             status: false,
//             message: 'Ocurrio un error al eliminar el idioma',
//             data: result.affectedRows
//         })
//     }
// }

module.exports = {
    getIdiomas,
    getIdiomasPostulante,
    addIdiomas,
};