class ExperienciaAcademica {
    constructor(
        id_experiencia_academica,
        nivel,
        institucion,
        carrera,
        anio_entrada,
        anio_salida,
        estudiando,
        id_postulante
    ) {
        (this.id_experiencia_academica = id_experiencia_academica),
        (this.nivel = nivel),
        (this.institucion = institucion),
        (this.carrera = carrera),
        (this.anio_entrada = anio_entrada),
        (this.anio_salida = anio_salida),
        (this.estudiando = estudiando),
        (this.id_postulante = id_postulante);
    }
}

module.exports = ExperienciaAcademica;