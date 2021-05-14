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
                empresasEvaluar.forEach((postulacion) => {
                    let comentarios = [];
                    let calif = 0;

                    postulacion.Vacante.Usuario.Comentarios.forEach((comentario) => {
                        if (comentario.id_emisor == req.params.id) {
                            comentarios.push(comentario);
                        }
                    });

                    postulacion.Vacante.Usuario.Calificaciones.forEach((calificacion) => {
                        if (
                            calificacion.id_emisor == req.params.id &&
                            calificacion.id_receptor == postulacion.Vacante.Usuario.id_usuario
                        ) {
                            calif = calificacion.calificacion;
                        }
                    });

                    let usuario = {
                        id_usuario: postulacion.Vacante.Usuario.id_usuario,
                        nombre: postulacion.Vacante.Usuario.nombre,
                        foto_perfil: postulacion.Vacante.Usuario.foto_perfil,
                        calificacion: calif,
                        Comentarios: comentarios,
                    };
                    pendientes.push(usuario);
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
                    let comentarios = [];
                    let calif = 0;

                    postulacion.Usuario.Comentarios.forEach((comentario) => {
                        if (comentario.id_emisor == req.params.id) {
                            comentarios.push(comentario);
                        }
                    });

                    postulacion.Usuario.Calificaciones.forEach((calificacion) => {
                        if (
                            calificacion.id_emisor == req.params.id &&
                            calificacion.id_receptor == postulacion.Usuario.id_usuario
                        ) {
                            calif = calificacion.calificacion;
                        }
                    });

                    let usuario = {
                        id_usuario: postulacion.Usuario.id_usuario,
                        nombre: postulacion.Usuario.nombre,
                        foto_perfil: postulacion.Usuario.foto_perfil,
                        calificacion: calif,
                        Comentarios: comentarios,
                    };
                    pendientes.push(usuario);
                });
            });
            return res.json(califDto.normally(true, pendientes));
        })
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });
};

const calificar = async(req, res) => {
    await califModel
        .calificar(req.body.id_emisor, req.body.id_receptor, req.body.calificacion)
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });

    let calificacion = await califModel
        .obtenerCalificacion(req.body.id_receptor)
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });

    let numCalificaciones = await califModel
        .obtenerNumCalificaciones(req.body.id_receptor)
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });

    let promedioCalif = calificacion / numCalificaciones;

    await califModel
        .actualizarCalifUsuario({
                calificacion: promedioCalif,
                numero_calificaciones: numCalificaciones,
            },
            req.body.id_receptor
        )
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    califDto.normally(false, "No se pudo guardar la calificacion")
                );
            }

            return res.json(
                califDto.normally(true, "Exito al guardar la calificacion")
            );
        })
        .catch((err) => {
            return res.json(califDto.normally(false, err));
        });
};

module.exports = {
    getUsuariosEvaluar,
    calificar,
};