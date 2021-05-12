const califModel = require("./model");
const califDto = require("../shared/dto");

const getUsuariosEvaluar = async(req, res) => {
    let usuario = await califModel
        .getUsuariosEvaluar(req.params.id)
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });

    let pendientes = [];

    if (usuario.tipo_usuario == "Postulante") {
        await califModel
            .getEmpresasEvaluar(usuario.id_usuario)
            .then((empresasEvaluar) => {
                empresasEvaluar.forEach(postulacion => {
                    pendientes.push(postulacion.Vacante.Usuario);
                });
                return res.json(califDto.normally(true, pendientes));
            })
            .catch((err) => {
                return res.json(califDto.normally(false, err));
            });
    }

    await califModel
        .getPostulantesEvaluar(usuario.id_usuario)
        .then((postulantesEvaluar) => {
            postulantesEvaluar.forEach((vacantes) => {
                vacantes.Postulaciones.forEach((postulacion) => {
                    pendientes.push(postulacion.Usuario);
                });
            });
            return res.json(califDto.normally(true, pendientes));
        })
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });
};

module.exports = {
    getUsuariosEvaluar,
};