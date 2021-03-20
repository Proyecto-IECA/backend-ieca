class PerfilVacante {
    constructor(
        id_perfil_vacante,
        id_vacante,
        id_perfil,
        descripcion,
        activo
    ) {
        (this.id_perfil_vacante = id_perfil_vacante),
        (this.id_vacante = id_vacante),
        (this.id_perfil = id_perfil),
        (this.descripcion = descripcion),
        (this.activo = activo);
    }
}

module.exports = PerfilVacante;