class Vacante {
    constructor(
        id_vacante,
        puesto,
        fecha_publicacion,
        imagen,
        sueldo,
        descripcion,
        disponible,
        id_empresa,
        id_sucursal,
        modalidad,
        nivel,
        vistas,
        activo,
        perfiles_vacante,
        vistas_vacante,
    ) {
        (this.id_vacante = id_vacante),
        (this.puesto = puesto),
        (this.fecha_publicacion = fecha_publicacion),
        (this.imagen = imagen),
        (this.sueldo = sueldo),
        (this.descripcion = descripcion),
        (this.disponible = disponible),
        (this.id_empresa = id_empresa),
        (this.id_sucursal = id_sucursal),
        (this.modalidad = modalidad),
        (this.nivel = nivel),
        (this.vistas = vistas),
        (this.activo = activo),
        (this.perfiles_vacante = perfiles_vacante),
        (this.vistas_vacante = vistas_vacante);
    }
}

module.exports = Vacante;