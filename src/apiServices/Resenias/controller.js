const reseniaModel = require("./model");
const reseniaDto = require("../shared/dto");

const getReseniasUsuario = async(req, res) => {
    await reseniaModel
        .getReseniasUsuario(req.params.id)
        .then((resenias) => {
            return res.json(reseniaDto.normally(true, resenias));
        })
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });
};

const getUsuariosEvaluar = async(req, res) => {
    let usuario = await reseniaModel
        .getUsuariosEvaluar(req.params.id)
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });

    let pendientes = [];

    if (usuario.tipo_usuario == "Postulante") {
        await reseniaModel
            .getEmpresasEvaluar(usuario.id_usuario)
            .then((empresasEvaluar) => {
                empresasEvaluar.forEach((postulacion) => {
                    let rese;

                    postulacion.Vacante.Usuario.Resenias.forEach((resenia) => {
                        if (
                            resenia.id_emisor == req.params.id &&
                            resenia.id_receptor == postulacion.Vacante.Usuario.id_usuario
                        ) {
                            rese = resenia;
                        }
                    });

                    let usuario = {
                        id_usuario: postulacion.Vacante.Usuario.id_usuario,
                        nombre: postulacion.Vacante.Usuario.nombre,
                        foto_perfil: postulacion.Vacante.Usuario.foto_perfil,
                        resenia: rese,
                    };
                    pendientes.push(usuario);
                });
                return res.json(reseniaDto.normally(true, pendientes));
            })
            .catch((err) => {
                return res.json(reseniaDto.normally(false, err));
            });
    }

    await reseniaModel
        .getPostulantesEvaluar(usuario.id_usuario)
        .then((postulantesEvaluar) => {
            postulantesEvaluar.forEach((vacantes) => {
                vacantes.Postulaciones.forEach((postulacion) => {

                    let rese;

                    postulacion.Usuario.Resenias.forEach((resenia) => {
                        if (
                            resenia.id_emisor == req.params.id &&
                            resenia.id_receptor == postulacion.Usuario.id_usuario
                        ) {
                            rese = resenia;
                        }
                    });

                    let usuario = {
                        id_usuario: postulacion.Usuario.id_usuario,
                        nombre: postulacion.Usuario.nombre,
                        foto_perfil: postulacion.Usuario.foto_perfil,
                        resenia: rese,
                    };
                    pendientes.push(usuario);
                });
            });
            return res.json(reseniaDto.normally(true, pendientes));
        })
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });
};

const calificar = async(req, res) => {
    await reseniaModel
        .calificar(req.body.id_emisor, req.body.id_receptor, req.body.calificacion, req.body.comentario)
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });

    let calificacion = await reseniaModel
        .obtenerCalificacion(req.body.id_receptor)
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });

    let numCalificaciones = await reseniaModel
        .obtenerNumResenias(req.body.id_receptor)
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });

    let promedioCalif = calificacion / numCalificaciones;

    await reseniaModel
        .actualizarCalifUsuario({
                calificacion: promedioCalif,
                numero_calificaciones: numCalificaciones,
            },
            req.body.id_receptor
        )
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    reseniaDto.normally(false, "No se pudo guardar la calificacion")
                );
            }

            return res.json(
                reseniaDto.normally(true, "Exito al guardar la calificacion")
            );
        })
        .catch((err) => {
            return res.json(reseniaDto.normally(false, err));
        });
};

module.exports = {
    getUsuariosEvaluar,
    calificar,
    getReseniasUsuario
};