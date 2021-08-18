const sequelize = require("sequelize");

const VacanteFav = require("../../services/mysql/models/VacantesFavoritas");
const Usuario = require("../../services/mysql/models/Usuarios");
const Vacante = require("../../services/mysql/models/Vacantes");

// Capa de acceso para el CRUD de vacantes favoritas
const addVacanteFav = async(vacanteFav) => {
    return new Promise((resolve, reject) =>
        VacanteFav.create(vacanteFav)
        .then((vacanteFav) => {
            return resolve(vacanteFav);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const deleteVacanteFav = async(id) => {
    return new Promise((resolve, reject) =>
        VacanteFav.destroy({
            where: {
                id_vacante_favorita: id,
            },
        })
        .then((result) => {
            return resolve(result);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVacantesFav = async(id_usuario) => {
    return new Promise((resolve, reject) =>
        Usuario.findByPk(id_usuario, {
            attributes: [],
            include: [{
                model: VacanteFav,
                attributes: ["id_vacante_favorita"],
                include: [{
                    model: Vacante,
                    attributes: [
                        "id_vacante",
                        "puesto", [sequelize.fn('date_format', sequelize.col('fecha_publicacion'), '%d/%m/%Y'), 'fecha_publicacion'],
                        "imagen",
                        "sueldo",
                        "descripcion",
                        "disponible",
                        "modalidad",
                        "nivel",
                        "vistas",
                        "publicada",
                        "activo",
                        "id_sucursal_fk",
                        "id_usuario_fk"
                    ],
                    include: {
                        model: Usuario,
                        attributes: ["nombre", "foto_perfil"]
                    }
                }, ],
            }, ],
        })
        .then((vacantesFav) => {
            return resolve(vacantesFav);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    addVacanteFav,
    deleteVacanteFav,
    getVacantesFav,
};