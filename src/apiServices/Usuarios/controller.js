const bcryptjs = require("bcryptjs");
const usuarioModel = require("./model");
const authDto = require("./dto");
const usuarioDto = require("../shared/dto");
const { generateJWT } = require("../shared/helpers/jwt");
const { enviarEmail } = require("../shared/helpers/email");

const createUsuario = async(req, res) => {
    const salt = bcryptjs.genSaltSync();

    const usuario = await usuarioModel
        .createUsuario({
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            fecha_nacimiento: req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            email: req.body.email,
            pass: bcryptjs.hashSync(req.body.pass, salt),
            tipo_usuario: req.body.tipo_usuario,
            administrador: req.body.administrador,
            ubicacion: req.body.ubicacion,
            giro: req.body.giro,
        })
        .then((usuario) => {
            return usuario;
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });

    const token = await generateJWT(usuario.id_usuario, "10 minutes");
    const url = "https://ieca.netlify.app/#/validarEmail/" + usuario.id_usuario + "/" + token;

    res.json(usuarioDto.normally(true, "Cuenta registrada de manera exitosa"));
    enviarEmail("validarEmail", url, usuario.email);
};

const loginUsuario = async(req, res) => {
    const usuario = await usuarioModel
        .loginUsuario(req.body.email)
        .then((usuario) => {
            return usuario;
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });

    if (!usuario) {
        return res.json(
            usuarioDto.normally(
                false,
                "No existe una cuenta con este email o fue descativada"
            )
        );
    }

    const validPassword = bcryptjs.compareSync(req.body.pass, usuario.pass);
    if (!validPassword) {
        return res.json(usuarioDto.normally(false, "Email o Password incorrecto"));
    }

    const token = await generateJWT(usuario.id_usuario, "12h");
    return res.json(
        authDto.auth(
            true, {
                id_usuario: usuario.id_usuario,
                tipo_usuario: usuario.tipo_usuario,
                email_validado: usuario.email_validado,
            },
            token
        )
    );
};

const renewPassUsuario = async(req, res) => {
    const salt = bcryptjs.genSaltSync();

    await usuarioModel
        .renewPassUsuario(req.params.id, {
            pass: bcryptjs.hashSync(req.body.pass, salt),
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    usuarioDto.normally(false, "No se pudo actualizar el password")
                );
            }
            return res.json(
                usuarioDto.normally(true, "Contraseña actualizada correctamente")
            );
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const validEmail = async(req, res) => {
    await usuarioModel
        .validEmail(req.params.id)
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    usuarioDto.normally(false, "No se pudo validar el email")
                );
            }
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });

    const usuario = await usuarioModel
        .getUsuario(req.params.id)
        .then((usuario) => {
            return usuario;
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });

    const token = await generateJWT(usuario.id_usuario, "12h");
    return res.json(
        authDto.auth(
            true, {
                id_usuario: usuario.id_usuario,
                tipo_usuario: usuario.tipo_usuario,
                email_validado: usuario.email_validado,
            },
            token
        )
    );
};

const updateUsuario = async(req, res) => {
    await usuarioModel
        .updateUsuario(req.params.id, {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            fecha_nacimiento: req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            telefono: req.body.telefono,
            telefono_casa: req.body.telefono_casa,
            pais: req.body.pais,
            codigo_postal: req.body.codigo_postal,
            ciudad: req.body.ciudad,
            domicilio: req.body.domicilio,
            administrador: req.body.administrador,
            pagina_web: req.body.pagina_web,
            ubicacion: req.body.ubicacion,
            giro: req.body.giro,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    usuarioDto.normally(false, "No se pudo actualizar la informacion")
                );
            }

            return res.json(
                usuarioDto.normally(true, "Exito al actualizar la informacion")
            );
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const updateFotoUsuario = async(req, res) => {
    await usuarioModel
        .updateFotoUsuario(req.params.id, {
            foto_perfil: req.body.foto_perfil,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    usuarioDto.normally(false, "No se pudo guardar la foto")
                );
            }

            return res.json(usuarioDto.normally(true, "Exito al actualizar la foto"));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const getUsuario = async(req, res) => {
    await usuarioModel
        .getUsuario(req.params.id)
        .then((usuario) => {
            if (usuario.tipo_usuario === "Postulante") {
                return res.json(
                    usuarioDto.normally(true, {
                        id_usuario: usuario.id_usuario,
                        nombre: usuario.nombre,
                        apellido_paterno: usuario.apellido_paterno,
                        apellido_materno: usuario.apellido_materno,
                        fecha_nacimiento: usuario.fecha_nacimiento,
                        sexo: usuario.sexo,
                        telefono_casa: usuario.telefono_casa,
                        telefono: usuario.telefono,
                        pais: usuario.pais,
                        codigo_postal: usuario.codigo_postal,
                        ciudad: usuario.ciudad,
                        domicilio: usuario.domicilio,
                        foto_perfil: usuario.foto_perfil,
                        cv: usuario.cv,
                        email: usuario.email,
                    })
                );
            }

            return res.json(
                usuarioDto.normally(true, {
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    administrador: usuario.administrador,
                    foto_perfil: usuario.foto_perfil,
                    pagina_web: usuario.pagina_web,
                    ubicacion: usuario.ubicacion,
                    telefono: usuario.telefono,
                    giro: usuario.giro,
                    numero_sucursales: usuario.numero_sucursales,
                    email: usuario.email,
                })
            );
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const sendEmail = async(req, res) => {
    const usuario = await usuarioModel
        .loginUsuario(req.body.email)
        .then((usuario) => {
            return usuario;
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
    if (!usuario) {
        return res.json(
            usuarioDto.normally(
                false,
                "No existe una cuenta con este email o fue descativada"
            )
        );
    }

    const token = await generateJWT(usuario.id_usuario, "10 minutes");
    const url = "https://ieca.netlify.app/#/" + req.body.ruta + "/" + usuario.id_usuario + "/" + token;

    res.json(usuarioDto.normally(true, "Envio correcto del email"))
    enviarEmail(req.body.ruta, url, req.body.email);
};

module.exports = {
    createUsuario,
    loginUsuario,
    renewPassUsuario,
    validEmail,
    updateUsuario,
    updateFotoUsuario,
    getUsuario,
    sendEmail,
};