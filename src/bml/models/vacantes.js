class Vacante {
    constructor(
        id_vacante,
        puesto,
        fecha_publicacion,
        imagen,
        sueldo,
        descripcion,
        disponible,
        id_empresa
    ) {
        (this.id_vacante = id_vacante),
        (this.puesto = puesto),
        (this.fecha_publicacion = fecha_publicacion),
        (this.imagen = imagen),
        (this.sueldo = sueldo),
        (this.descripcion = descripcion),
        (this.disponible = disponible),
        (this.id_empresa = id_empresa);
    }
}

module.exports = Vacante;