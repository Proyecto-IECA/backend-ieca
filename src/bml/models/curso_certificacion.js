class CursoCertificacion {
    constructor(
        id_curso_certificacion,
        nombre,
        descripcion,
        constancia,
        link,
        id_postulante
    ) {
        this.id_curso_certificacion = id_curso_certificacion,
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.constancia = constancia,
            this.link = link,
            this.id_postulante = id_postulante
    }
}

module.exports = CursoCertificacion;