class Sucursal {
    constructor(
        id_sucursal,
        id_empresa,
        direccion,
        etiqueta
    ) {
        (this.id_sucursal = id_sucursal),
        (this.id_empresa = id_empresa),
        (this.direccion = direccion),
        (this.etiqueta = etiqueta);
    }
}

module.exports = Sucursal;