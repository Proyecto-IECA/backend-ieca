class PerfilPostulante {
    constructor(
        id_perfil_postulante,
        id_postulante,
        id_perfil,
        descripcion,
        activo
    ) {
        this.id_perfil_postulante = id_perfil_postulante,
            this.id_postulante = id_postulante,
            this.id_perfil = id_perfil,
            this.descripcion = descripcion,
            this.activo = activo
    }
}

module.exports = PerfilPostulante;