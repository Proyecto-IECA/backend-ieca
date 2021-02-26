//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../dal/data-access');

//Funcion para obtener todos los pustulantes
const getPostulantes = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulantes = await query('stp_getall_postulante()');

    //Se verifica si la respuesta devolvio algo para retornar los postulante
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

//Funcion para obtener un postulante a traves de su id
const getPostulante = async(req, res) => {
    //Se crea una constante que sera el id y se recibira por params de nuestra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_postulante = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams('stp_getbyid_postulante(?)', mysqlParams);

    //Se verifica si el primer objeto de nuestra respuesta tiene algo
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

//Funcion para actualizar el perfil del postulante
const updatePostulante = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Se crea una constante con los atributos del body de nuetra peticion
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
    //Creamos una constante con los parametros para el procedimiento almacenado
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

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams('stp_update_postulante(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);

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

//Funcion para dar de baja al postulante
const deletePostulante = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_postualnte = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado 
    let result = await queryParams('stp_delete_postulante(?)', mysqlParams);

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
    getPostulantes,
    getPostulante,
    updatePostulante,
    deletePostulante,
};