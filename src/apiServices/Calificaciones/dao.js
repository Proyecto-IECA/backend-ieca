const Usuario = require("../../services/mysql/models/Usuarios");
const Postulacion = require("../../services/mysql/models/Postulaciones");
const Vacante = require("../../services/mysql/models/Vacantes");
const { Op } = require("sequelize");


const getUsuariosEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: ["id_usuario", "tipo_usuario"],
        })
        .then((usuario) => {
            return resolve(usuario);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getPostulantesEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Vacante.findAll({
            attributes: ["id_vacante"],
            where: {
                id_usuario_fk: id_usuario,
            },
            include: {
                model: Postulacion,
                attributes: ["id_postulacion", "fecha_post_aceptada"],
                where: {
                    fecha_post_aceptada: {
                        [Op.lte]: new Date(Date.now())
                    }
                },
                include: {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre"],
                },
            },
        })
        .then((postulantesEvaluar) => {
            return resolve(postulantesEvaluar);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getEmpresasEvaluar = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Postulacion.findAll({
            attributes: ["id_postulacion", "fecha_post_aceptada"],
            where: {
                id_usuario_fk: id_usuario,
                fecha_post_aceptada: {
                    [Op.lte]: new Date(Date.now())
                }
            },
            include: {
                model: Vacante,
                attributes: ["id_vacante"],
                include: {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre"],
                },
            },
        })
        .then((empresasEvaluar) => {
            return resolve(empresasEvaluar);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    getUsuariosEvaluar,
    getPostulantesEvaluar,
    getEmpresasEvaluar,
};