//Se requiere del metodo query y queryParams del archivo data-access.js
const { query, queryParams } = require('../../dal/data-access');
//Se requiere el metodo para obtener el email del JWT
const { getEmail } = require('../helpers/jwt');
//Se requiere el uso de los siguientes modelos
const Postulante = require('../models/postulante');
const CursoCertificacion = require('../models/curso_certificacion');
const ExperienciaAcademica = require('../models/experiencia_academica');
const ExperienciaLaboral = require('../models/experiencia_laboral');
const HabilidadPostulante = require('../models/habilidad_postulante');
const IdiomaPostulante = require('../models/idioma_postulante');
const PerfilPostulante = require('../models/perfil_postulante');
const ValorPostulante = require('../models/valor_postulante');

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
    const mysqlParam = [
        id_postulante = id
    ];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let resultQuery = await queryParams('stp_getbyid_postulante(?)', mysqlParam);

    //Si el email no existe en la BD
    if (!resultQuery[0][0]) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al realizar la consulta',
            data: null
        });
    }

    //Creamos un postulante con la respuesta de la BD
    let postulante = new Postulante();
    postulante = resultQuery[0][0];

    //Se obtienen los cursos y certificaciones del postulante
    let cursosCertificaciones = new CursoCertificacion();
    resultQuery = await queryParams('stp_getbyid_cursos_certificaciones(?)', mysqlParam);
    cursosCertificaciones = resultQuery[0];

    //Se obtienen las experiencias academicas del postulante
    let experienciasAcademicas = new ExperienciaAcademica();
    resultQuery = await queryParams('stp_getbyid_experiencias_academicas(?)', mysqlParam);
    experienciasAcademicas = resultQuery[0];

    //Se obtienen las experiencias laborales del postulante
    let experienciasLaborales = new ExperienciaLaboral();
    resultQuery = await queryParams('stp_getbyid_experiencias_laborales(?)', mysqlParam);
    experienciasLaborales = resultQuery[0];

    //Se obtienen las habilidades del postulante
    let habilidadesPostulante = new HabilidadPostulante();
    resultQuery = await queryParams('stp_getbyid_habilidades_postulante(?)', mysqlParam);
    habilidadesPostulante = resultQuery[0];

    //Se obtienen los idiomas que domina el postulante
    let idiomasPostulante = new IdiomaPostulante();
    resultQuery = await queryParams('stp_getbyid_idiomas_postulante(?)', mysqlParam);
    idiomasPostulante = resultQuery[0];

    //Se obtienen los perfiles del postulante
    let perfilesPostulante = new PerfilPostulante();
    resultQuery = await queryParams('stp_getbyid_perfiles_postulante(?)', mysqlParam);
    perfilesPostulante = resultQuery[0];

    //Se obtienen los valores del postulante
    let valoresPostulante = new ValorPostulante();
    resultQuery = await queryParams('stp_getbyid_valores_postulante(?)', mysqlParam);
    valoresPostulante = resultQuery[0];

    //Se completa el perfil del postulante
    postulante.cursos_certificaciones = cursosCertificaciones;
    postulante.experiencias_academicas = experienciasAcademicas;
    postulante.experiencias_laborales = experienciasLaborales;
    postulante.habilidades_postulante = habilidadesPostulante;
    postulante.idiomas_postulante = idiomasPostulante;
    postulante.perfiles_postulante = perfilesPostulante;
    postulante.valores_postulante = valoresPostulante;

    res.json({
        status: true,
        message: 'Consulta Exitosa',
        data: postulante
    })

}

//Funcion para actualizar el perfil del postulante
const updatePostulante = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion 
    const token = req.header('x-token');
    //Generamos el email del postulante con la funcion getEmail
    const email = getEmail(token);

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
        email,
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
    let resultQuery = await queryParams('stp_update_postulante(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', mysqlParams);

    //Creamos un postulante con la respuesta de la BD
    let postulante = new Postulante();
    postulante = resultQuery[0][0];

    //Se verifica si el postulante no esta vacio
    if (!postulante) {
        return res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la informacion',
            data: null
        });
    }

    res.json({
        status: true,
        message: 'Informacion actualizada de manera exitosa',
        data: postulante
    });
}

const validPerfilCompletoPostulante = async(req, res) => {
    //Se crean una constante que sera igual a el header que tiene la peticion 
    const token = req.header('x-token');
    //Generamos el email del postulante con la funcion getEmail
    const email = getEmail(token);

    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let resultQuery = await queryParams('stp_login_postulante(?)', mysqlParam);
    if (!resultQuery[0][0])  {
        return res.json({
            status: false,
            message: 'No existe ese usario',
            data: null
        });
    }

    //Creamos un postulante con la respuesta de la BD
    let postulante = new Postulante();
    postulante = resultQuery[0][0];

    if (postulante.cv) {
        return res.json({
            status: true,
            message: 'Perfil completo',
            date: true
        });
    }

    if (!postulante.domicilio) {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    if (!postulante.telefono_celular) {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    if (!postulante.foto_perfil) {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    const mysqlParam2 = [
        id_postulante = postulante.id_postulante
    ];

    //Se obtienen las experiencias laborales del postulante
    let experienciasLaborales = new ExperienciaLaboral();
    resultQuery = await queryParams('stp_getbyid_experiencias_laborales(?)', mysqlParam2);
    experienciasLaborales = resultQuery[0];

    if (experienciasLaborales == '') {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    //Se obtienen las experiencias academicas del postulante
    let experienciasAcademicas = new ExperienciaAcademica();
    resultQuery = await queryParams('stp_getbyid_experiencias_academicas(?)', mysqlParam2);
    experienciasAcademicas = resultQuery[0];

    if (experienciasAcademicas == '') {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    //Se obtienen los perfiles del postulante
    let perfilesPostulante = new PerfilPostulante();
    resultQuery = await queryParams('stp_getbyid_perfiles_postulante(?)', mysqlParam2);
    perfilesPostulante = resultQuery[0];

    if (perfilesPostulante == '') {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    //Se obtienen las habilidades del postulante
    let habilidadesPostulante = new HabilidadPostulante();
    resultQuery = await queryParams('stp_getbyid_habilidades_postulante(?)', mysqlParam2);
    habilidadesPostulante = resultQuery[0];

    if (habilidadesPostulante == '') {
        return res.json({
            status: false,
            message: 'Perfil incompleto',
            date: false
        });
    }

    res.json({
        status: true,
        message: 'Perfil completo',
        date: true
    })

}

//Funcion para dar de baja al postulante
const deletePostulante = async(req, res) => {
    //Se crea una constante con el atributo de los params de nuetra peticion
    const { id } = req.params;
    //Creamos una constante con los parametros para el procedimiento almacenado
    const mysqlParams = [
        id_postulante = id
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
    validPerfilCompletoPostulante
};