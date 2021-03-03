class IdiomaPostulante {
    constructor(
        id_idioma_postulante,
        id_postulante,
        id_idioma,
        nivel,
        descripcion,
        activo
    ) {
        this.id_idioma_postulante = id_idioma_postulante,
            this.id_postulante = id_postulante,
            this.id_idioma = id_idioma,
            this.nivel = nivel,
            this.descripcion = descripcion,
            this.activo = activo
    }
}

module.exports = IdiomaPostulante;