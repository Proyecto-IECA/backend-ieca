class ExperienciaLaboral {
    constructor(
        id_experiencia_laboral,
        puesto,
        empresa,
        actividades,
        mes_entrada,
        anio_entrada,
        mes_salida,
        anio_salida,
        trabajando,
        id_postulante
    ) {
        this.id_experiencia_laboral = id_experiencia_laboral,
            this.puesto = puesto,
            this.empresa = empresa,
            this.actividades = actividades,
            this.mes_entrada = mes_entrada,
            this.anio_entrada = anio_entrada,
            this.mes_salida = mes_salida,
            this.anio_salida = anio_salida,
            this.trabajando = trabajando,
            this.id_postulante = id_postulante
    }
}

module.exports = ExperienciaLaboral;