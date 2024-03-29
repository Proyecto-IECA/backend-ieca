const vacanteModel = require("./model");
const vacanteDto = require("../shared/dto");

// Función para obtener las vacantes
const getVacantes = async(req, res) => {
    if (req.body.filter_perfiles == true) {
        await vacanteModel
            .getVacantesFilter(req.params.id, req.body.fecha, req.body.perfiles)
            .then((vacantes) => {
                return res.json(vacanteDto.normally(true, vacantes));
            })
            .catch((err) => {
                return res.json(vacanteDto.normally(false, err));
            });
    } else {
        await vacanteModel
            .getVacantes(req.params.id, req.body.fecha, req.body.limites)
            .then((vacantes) => {
                return res.json(vacanteDto.normally(true, vacantes));
            })
            .catch((err) => {
                return res.json(vacanteDto.normally(false, err));
            });
    }
};

// Función para obtener una vacante
const getVacante = async(req, res) => {
    await vacanteModel
        .getVacante(req.params.id, req.params.idU)
        .then((vacante) => {
            return res.json(vacanteDto.normally(true, vacante));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para obtener las vacantes de una empresa
const getVacantesEmpresa = async(req, res) => {
    let vacantesP;
    let vacantesB;
    let vacantesD;
    let vacantesC;

    await vacanteModel
        .getVacantesEmpresa({
            activo: 1,
            id_usuario_fk: req.params.id,
            publicada: 1,
        })
        .then((vacantes) => {
            vacantesP = vacantes;
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });

    await vacanteModel
        .getVacantesEmpresa({
            activo: 1,
            id_usuario_fk: req.params.id,
            publicada: 0,
        })
        .then((vacantes) => {
            vacantesB = vacantes;
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });

    await vacanteModel
        .getVacantesEmpresa({
            activo: 1,
            id_usuario_fk: req.params.id,
            disponible: 1,
        })
        .then((vacantes) => {
            vacantesD = vacantes;
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });

    await vacanteModel
        .getVacantesEmpresa({
            activo: 1,
            id_usuario_fk: req.params.id,
            disponible: 0,
        })
        .then((vacantes) => {
            vacantesC = vacantes;
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });

    let vacantes = {
        VacantesPublicadas: vacantesP,
        VacantesBorradores: vacantesB,
        VacantesDisponibles: vacantesD,
        VacantesCerradas: vacantesC,
    };
    return res.json(vacanteDto.normally(true, vacantes));
};

// Función para crear una nueva vacante
const addVacante = async(req, res) => {
    await vacanteModel
        .addVacante({
            puesto: req.body.puesto,
            sueldo: req.body.sueldo,
            descripcion: req.body.descripcion,
            modalidad: req.body.modalidad,
            nivel: req.body.nivel,
            id_usuario_fk: req.body.id_usuario_fk,
            id_sucursal_fk: req.body.id_sucursal_fk,
            publicada: req.body.publicada,
            fecha_publicacion: req.body.fecha_publicacion,
        })
        .then((vacante) => {
            return res.json(vacanteDto.normally(true, vacante));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para actualizar una vacante
const updateVacante = async(req, res) => {
    await vacanteModel
        .updateVacante(req.params.id, {
            puesto: req.body.puesto,
            sueldo: req.body.sueldo,
            descripcion: req.body.descripcion,
            modalidad: req.body.modalidad,
            nivel: req.body.nivel,
            id_sucursal_fk: req.body.id_sucursal_fk,
            publicada: req.body.publicada,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(
                        false,
                        "Ocurrió un error al actualizar la vacante"
                    )
                );
            }

            return res.json(
                vacanteDto.normally(true, "Éxito al actualizar la vacante")
            );
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para borrar una vacante
const deleteVacante = async(req, res) => {
    await vacanteModel
        .deleteVacante(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(false, "Ocurrió un error al eliminar la vacante")
                );
            }

            return res.json(
                vacanteDto.normally(true, "Éxito al eliminar la vacante")
            );
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para públicar una vacante
const publicarVacante = async(req, res) => {
    await vacanteModel
        .publicarVacante(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(false, "No se pudo publicar la vacante")
                );
            }

            return res.json(
                vacanteDto.normally(true, "Éxito al publicar la vacante")
            );
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para dejar de públicar una vacante
const noPublicarVacante = async(req, res) => {
    await vacanteModel
        .noPublicarVacante(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(false, "No se pudo quitar la vacante")
                );
            }

            return res.json(vacanteDto.normally(true, "Éxito al quitar la vacante"));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para cerrar una vacante
const cerrarVacante = async(req, res) => {
    await vacanteModel
        .cerrarVacante(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(false, "No se pudo cerrar la vacante")
                );
            }

            return res.json(vacanteDto.normally(true, "Éxito al cerrar la vacante"));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para abrir una vacante
const abrirVacante = async(req, res) => {
    await vacanteModel
        .abrirVacante(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    vacanteDto.normally(false, "No se pudo abrir la vacante")
                );
            }

            return res.json(vacanteDto.normally(true, "Éxito al abrir la vacante"));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para obtener los postulantes de una vacante
const getPostulantes = async(req, res) => {
    await vacanteModel
        .getPostulantes(req.params.id)
        .then((postulantes) => {
            return res.json(vacanteDto.normally(true, postulantes));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

// Función para obtener las postulaciones de una vacante
const getPostulaciones = async(req, res) => {
    await vacanteModel
        .getPostulaciones(req.params.id)
        .then((numPostulaciones) => {
            return res.json(vacanteDto.normally(true, numPostulaciones));
        })
        .catch((err) => {
            return res.json(vacanteDto.normally(false, err));
        });
};

module.exports = {
    getVacantes,
    getVacante,
    getVacantesEmpresa,
    addVacante,
    updateVacante,
    deleteVacante,
    publicarVacante,
    noPublicarVacante,
    cerrarVacante,
    abrirVacante,
    getPostulantes,
    getPostulaciones,
};