class HabilidadPostulante {
    constructor(
        id_habilidad_postulante,
        id_postulante,
        id_habilidad,
        descripcion,
        activo
    ) {
        this.id_habilidad_postulante = id_habilidad_postulante,
            this.id_postulante = id_postulante,
            this.id_habilidad = id_habilidad,
            this.descripcion = descripcion,
            this.activo = activo
    }
}

module.exports = HabilidadPostulante;