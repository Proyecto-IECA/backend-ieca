//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../../dal/data-access');
const PerfilPostulante = require('../../models/perfil_postulante');

const getPerfiles = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let perfiles = await query('stp_getall_perfiles()');

    //Se verifica si la respuesta devolvio algo para retornar los postulante
    if (!perfiles[0]) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null,
        });
    }

    res.json({
        status: true,
        message: 'Consulta Exitosa',
        data: perfiles[0],
    });
};

const getPerfilesPostulante = async(req, res) => {
    const { id } = req.params;
    const mysqlParam = [(id_postulante = id)];

    resultQuery = await queryParams(
        'stp_getbyid_perfiles_postulante(?)',
        mysqlParam
    );

    //Se obtienen los perfiles del postulante
    let perfilesPostulante = new PerfilPostulante();
    perfilesPostulante = resultQuery[0];

    res.json({
        status: true,
        message: 'Exito al obtener los perfiles',
        data: perfilesPostulante,
    });
};

const addperfiles = async(req, res) => {
    const { id_postulante, perfiles } = req.body;

    const mysqlParam = [id_postulante];

    await queryParams('stp_delete_perfiles_postulante(?)', mysqlParam);

    perfiles.forEach(async(perfil) => {
        let mysqlParams = [perfil.descripcion, perfil.id_postulante];

        await queryParams(
            'stp_add_perfil_postulante(?, ?)',
            mysqlParams
        );
    });

    resultQuery = await queryParams(
        'stp_getbyid_perfiles_postulante(?)',
        mysqlParam
    );

    //Se obtienen los perfiles del postulante
    let perfilesPostulante = new PerfilPostulante();
    perfilesPostulante = resultQuery[0];

    res.json({
        status: true,
        message: 'Exito al obtener los perfiles',
        data: perfilesPostulante,
    });
};

// const deletePerfiles = async(req, res) => {
//     //Se crea una constante con el atributo de los params de nuetra peticion
//     const { id } = req.params;
//     //Creamos una constante con los parametros para el procedimiento almacenado
//     const mysqlParams = [(id_empresa = id)];

//     //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
//     let result = await queryParams(
//         'stp_delete_perfiles_postulantes(?)',
//         mysqlParams
//     );
//     //Se verifica si los renglones afectados de la BD son diferentes de cero
//     if (result.affectedRows != 0) {
//         res.json({
//             status: true,
//             message: 'perfil eliminada correctamente',
//             data: result.affectedRows,
//         });
//     } else {
//         res.json({
//             status: false,
//             message: 'Ocurrio un error al eliminar el perfil',
//             data: result.affectedRows,
//         });
//     }
// };

module.exports = {
    getPerfiles,
    getPerfilesPostulante,
    addperfiles,
    // deletePerfiles,
};