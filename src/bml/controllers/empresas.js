//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require("../../dal/data-access");
const { getEmail } = require("../helpers/jwt");

const Empresa = require("../models/empresa");

//Funcion para obtener todos las empresas
const getEmpresas = async(req, res) => {
    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresas = await query("stp_getall_empresa()");
    //Se verifica si la respuesta devolvio algo para retornas las empresas
    if (empresas[0]) {
        res.json({
            status: true,
            message: "Consulta Exitosa",
            data: empresas[0],
        });
    } else {
        res.json({
            status: false,
            message: "Ocurrio un error al realizar la consulta",
            data: null,
        });
    }
};

//Funcion para obtener una empresa a traves de su id
const getEmpresa = async(req, res) => {
    //Se crea una constante que sera el id y se recibira por params de nuestra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParam = [(id_empresa = id)];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let resultQuery = await queryParams("stp_getbyid_empresa(?)", mysqlParam);
    //Se verifica si el primer objeto de nuestra respuesta tiene algo
    if (!resultQuery[0][0]) {
        return res.json({
            status: false,
            message: "Ocurrio un error al realizar la consulta",
            data: null,
        });
    }

    let empresa = new Empresa();
    empresa = resultQuery[0][0];

    res.json({
        status: true,
        message: "Consulta exitosa",
        data: empresa,
    });
};

//Funcion para actualizar el perfil de la empresa
const updateEmpresa = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion
    const token = req.header("x-token");
    //Generamos el id del empresa con la funcion getId
    const email = getEmail(token);

    //Se crea una constante con los atributos del body de nuetra peticion
    const {
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro,
    } = req.body;

    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        email,
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro,
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let resultQuery = await queryParams(
        "stp_update_empresa(?, ?, ?, ?, ?, ?, ?, ?)",
        mysqlParams
    );

    let empresa = new Empresa();
    empresa = resultQuery[0][0];

    //Se verifica si la empresa no esta vacia
    if (!empresa) {
        return res.json({
            status: false,
            message: "Ocurrio un error al actualizar la informacion",
            data: null,
        });
    }

    res.json({
        status: true,
        message: "Informacion actualizada de manera exitosa",
        data: empresa,
    });
};

const validPerfilCompletoEmpresa = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion
    const token = req.header("x-token");
    //Generamos el email del postulante con la funcion getEmail
    const email = getEmail(token);

    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let resultQuery = await queryParams("stp_login_empresa(?)", mysqlParam);
    if (!resultQuery[0][0]) {
        return res.json({
            status: false,
            message: "No existe ese usario",
            data: null,
        });
    }

    let empresa = new Empresa();
    empresa = resultQuery[0][0];

    if (!empresa.telefono) {
        return res.json({
            status: false,
            message: "Perfil incompleto",
            data: false,
        });
    }

    if (!empresa.foto_empresa) {
        return res.json({
            status: false,
            message: "Perfil incompleto",
            data: false,
        });
    }

    res.json({
        status: true,
        message: "Perfil completo",
        data: true,
    });
};

//Funcion para dar de baja la empresa
const deleteEmpresa = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [(id_empresa = id)];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let result = await queryParams("stp_delete_empresa(?)", mysqlParams);
    //Se verifica si los renglones afectados de la BD son diferentes de cero
    if (result.affectedRows != 0) {
        res.json({
            status: true,
            message: "Cuenta eliminada correctamente",
            data: result.affectedRows,
        });
    } else {
        res.json({
            status: false,
            message: "Ocurrio un error al eliminar la cuenta",
            data: result.affectedRows,
        });
    }
};

//Exportamos las funciones para utilizar en nuestros endpoints
module.exports = {
    getEmpresas,
    getEmpresa,
    updateEmpresa,
    deleteEmpresa,
    validPerfilCompletoEmpresa,
};