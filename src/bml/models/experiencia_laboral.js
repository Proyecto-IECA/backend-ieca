class ExperienciaLaboral {
    constructor(
        id_experiencia_laboral,
        puesto,
        empresa,
        actividades,
        fecha_entrada,
        fecha_salida,
        trabajando,
        id_postulante
    ) {
        this.id_experiencia_laboral = id_experiencia_laboral,
            this.puesto = puesto,
            this.empresa = empresa,
            this.actividades = actividades,
            this.fecha_entrada = fecha_entrada,
            this.fecha_salida = fecha_salida,
            this.trabajando = trabajando,
            this.id_postulante = id_postulante
    }
}

module.exports = ExperienciaLaboral;