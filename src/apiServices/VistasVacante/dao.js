const VistaVacante = require("../../services/mysql/models/VistasVacante");
const Vacante = require("../../services/mysql/models/Vacantes");

const addVistaVacante = async(id_vacante, id_usuario) => {
    return new Promise((resolve, reject) =>
        VistaVacante.findOne({
            where: {
                id_vacante_fk: id_vacante,
                id_usuario_fk: id_usuario,
            },
        })
        .then((vistaVacante) => {
            if (!vistaVacante) {
                VistaVacante.create({
                    id_vacante_fk: id_vacante,
                    id_usuario_fk: id_usuario,
                }).then((vistaVacante) => {
                    console.log(vistaVacante);
                    return resolve(vistaVacante);
                });
            }
            return resolve(vistaVacante);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const updateVistasVacante = async(id_vacante) => {
    return new Promise((resolve, reject) =>
        Vacante.findByPk(id_vacante)
        .then((vacante) => {
            let vistasVacante = vacante.vistas + 1;
            Vacante.update({ vistas: vistasVacante }, {
                    where: {
                        id_vacante: vacante.id_vacante,
                    },
                })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

const getVistasUsuario = async(id_vacante) => {
    return new Promise((resolve, reject) =>
        VistaVacante.count({
            where: {
                id_vacante_fk: id_vacante,
            },
        })
        .then((vistasUsuario) => {
            return resolve(vistasUsuario);
        })
        .catch((err) => {
            return reject(err);
        })
    );
};

module.exports = {
    addVistaVacante,
    updateVistasVacante,
    getVistasUsuario,
};