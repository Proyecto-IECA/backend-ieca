const { query, queryParams } = require("../../../dal/data-access");
const HabilidadPostulante = require("../../models/habilidad_postulante");

const getHabilidades = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let habilidades = await query("stp_getall_habilidades()");

    //Se verifica si la respuesta devolvio algo para retornar los postulante
    if (!habilidades[0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al realizar la consulta",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Consulta Exitosa",
        data: habilidades[0],
    });
};

const getHabilidadesPostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [(id_postulante = id)];

    resultQuery = await queryParams(
        "stp_getbyid_habilidades_postulante(?)",
        mysqlParam
    );

    //Se obtienen los habilidades del postulante
    let habilidadesPostulante = new HabilidadPostulante();
    habilidadesPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener los habilidades",
        data: habilidadesPostulante,
    });
};

const addHabilidades = async(req, res) => {
    const { id_postulante, habilidades } = req.body;

    const mysqlParam = [id_postulante];

    await queryParams("stp_delete_habilidades_postulantes(?)", mysqlParam);

    habilidades.forEach(async(habilidad) => {
        let mysqlParams = [habilidad.descripcion, habilidad.id_postulante];

        await queryParams("stp_add_habilidad_postulante(?, ?)", mysqlParams);
    });

    resultQuery = await queryParams(
        "stp_getbyid_habilidades_postulante(?)",
        mysqlParam
    );

    //Se obtienen los habilidades del postulante
    let habilidadesPostulante = new HabilidadPostulante();
    habilidadesPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener las habilidades",
        data: habilidadesPostulante,
    });
};

// const deleteHabilidades = async(req, res) => {
//     //Se crea una constante con el atributo de los params de nuetra peticion
//     const { id } = req.params;
//     //Creamos una constante con los parametros para el procedimiento almacenado
//     const mysqlParams = [
//         id_empresa = id
//     ];

//     //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
//     let result = await queryParams('stp_delete_habilidades_postulantes(?)', mysqlParams);
//     //Se verifica si los renglones afectados de la BD son diferentes de cero
//     if (result.affectedRows != 0) {
//         res.json({
//             status: true,
//             message: 'habilidad eliminada correctamente',
//             data: result.affectedRows
//         });
//     } else {
//         res.json({
//             status: false,
//             message: 'Ocurrio un error al eliminar la habilidad',
//             data: result.affectedRows
//         })
//     }
// }

module.exports = {
    getHabilidades,
    getHabilidadesPostulante,
    addHabilidades,
};