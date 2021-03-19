class Empresa {
    constructor(
        id_empresa,
        nombre,
        administrador,
        foto_empresa,
        pagina_web,
        ubicacion,
        telefono,
        giro,
        calificacion,
        email,
        sucursales_empresa
    ) {
        (this.id_empresa = id_empresa),
        (this.nombre = nombre),
        (this.administrador = administrador),
        (this.foto_empresa = foto_empresa),
        (this.pagina_web = pagina_web),
        (this.ubicacion = ubicacion),
        (this.telefono = telefono),
        (this.giro = giro),
        (this.calificacion = calificacion),
        (this.email = email);
        (this.sucursales_empresa = sucursales_empresa)
    }
}

module.exports = Empresa;