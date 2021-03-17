//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require("../../../dal/data-access");
const ValorPostulante = require("../../models/valor_postulante");

const getValores = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let valores = await query("stp_getall_valores()");

    //Se verifica si la respuesta devolvio algo para retornar los postulante
    if (!valores[0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al realizar la consulta",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Consulta Exitosa",
        data: valores[0],
    });
};

const getValoresPostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [(id_postulante = id)];

    resultQuery = await queryParams(
        "stp_getbyid_valores_postulante(?)",
        mysqlParam
    );

    //Se obtienen los valores del postulante
    let valoresPostulante = new ValorPostulante();
    valoresPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener los valores",
        data: valoresPostulante,
    });
};

const addValores = async(req, res) => {
    const { id_postulante, valores } = req.body;

    const mysqlParam = [id_postulante];

    await queryParams("stp_delete_valores_postulante(?)", mysqlParam);

    valores.forEach(async(valor) => {
        let mysqlParams = [valor.descripcion, valor.id_postulante];

        await queryParams("stp_add_valor_postulante(?, ?)", mysqlParams);
    });

    resultQuery = await queryParams(
        "stp_getbyid_valores_postulante(?)",
        mysqlParam
    );

    //Se obtienen los valores del postulante
    let valoresPostulante = new ValorPostulante();
    valoresPostulante = resultQuery[0];

    res.json({
        status: true,
        message: "Exito al obtener las valores",
        data: valoresPostulante,
    });
};

// const deleteValores = async(req, res) => {
//     //Se crea una constante con el atributo de los params de nuetra peticion
//     const { id } = req.params;
//     //Creamos una constante con los parametros para el procedimiento almacenado
//     const mysqlParams = [
//         id_empresa = id
//     ];

//     //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
//     let result = await queryParams('stp_delete_valores_postulante(?)', mysqlParams);
//     //Se verifica si los renglones afectados de la BD son diferentes de cero
//     if (result.affectedRows != 0) {
//         res.json({
//             status: true,
//             message: 'valor eliminado correctamente',
//             data: result.affectedRows
//         });
//     } else {
//         res.json({
//             status: false,
//             message: 'Ocurrio un error al eliminar los valores',
//             data: result.affectedRows
//         })
//     }
// }

module.exports = {
    getValores,
    getValoresPostulante,
    addValores,
};