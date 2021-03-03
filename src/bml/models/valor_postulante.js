class ValorPostulante {
    constructor(
        id_valor_postulante,
        id_postulante,
        id_valor,
        descripcion,
        activo
    ) {
        this.id_valor_postulante = id_valor_postulante,
            this.id_postulante = id_postulante,
            this.id_valor = id_valor,
            this.descripcion = descripcion,
            this.activo = activo
    }
}

module.exports = ValorPostulante;