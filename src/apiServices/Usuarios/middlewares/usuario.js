const usuarioModel = require("../model");
const usuarioDto = require("../../shared/dto");
const authDto = require("../dto");
const { generateJWT, getId } = require("../../shared/helpers/jwt");

// Función para validar el email del usuario
const validarEmail = async(req, res) => {
    await usuarioModel
        .getUsuario(req.params.id)
        .then((usuario) => {
            if (usuario.email_validado === 0) {
                return res.json(usuarioDto.normally(false, "Email sin validar"));
            }

            return res.json(usuarioDto.normally(true, "Email validado"));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

// Función para validar el perfil del usuario
const validarPerfil = async(req, res) => {
    await usuarioModel
        .getUsuarioPerfil(req.params.id)
        .then((usuario) => {
            errores = [];
            if (!usuario.telefono) {
                errores.push('- Un teléfono');
            }
            if (!usuario.foto_perfil) {
                errores.push('- La foto de perfil');
            }

            if (usuario.tipo_usuario === "Postulante") {
                if (!usuario.domicilio) {
                    errores.push('- El domicilio');
                }
                if (usuario.Experiencias_Laborales.length < 1) {
                    errores.push('- Al menos una experiencia laboral');
                }
                if (usuario.Experiencias_Academicas.length < 1) {
                    errores.push('- Al menos una experiencia académica');
                }
                if (usuario.Perfiles.length < 1) {
                    errores.push('- Al menos un perfil');
                }
                if (usuario.Habilidades.length < 1) {
                    errores.push('- Al menos una habilidad');
                }
            } else {
                if (!usuario.ubicacion) {
                    errores.push('- La ubicacion de la empresa');
                }
            }

            if (errores.length > 0) {
                return res.json(usuarioDto.normally(false, errores));
            }

            return res.json(usuarioDto.normally(true, usuario));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
}

// Función para validar el token del usuario
const validarToken = async(req, res) => {
    const token = req.header("x-token");
    const idToken = getId(token);
    const id = req.params.id;

    if (idToken == id) {
        const usuario = await usuarioModel
            .getUsuario(id)
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
                    email_validado: usuario.email_validado
                },
                token
            )
        );
    } else {
        return res.json(usuarioDto.normally(false, 'Token invalido'));
    }

}

module.exports = {
    validarEmail,
    validarPerfil,
    validarToken
};