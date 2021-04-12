const usuarioModel = require("./model");
const usuarioDto = require("../shared/dto");
const bcryptjs = require("bcryptjs");

const createUsuario = async(req, res) => {
    const salt = bcryptjs.genSaltSync();

    await usuarioModel
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
            return res.json(usuarioDto.normally(true, usuario));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const loginUsuario = async(req, res) => {
    await usuarioModel
        .loginUsuario(req.body.email)
        .then((usuario) => {
            if (!usuario) {
                return res.json(usuarioDto.normally(false, "No existe una cuenta con este email o fue descativada"));
            }

            const validPassword = bcryptjs.compareSync(req.body.pass, usuario.pass);
            if (!validPassword) {
                return res.json(usuarioDto.normally(false, "Email o Password incorrecto"));
            }

            return res.json(usuarioDto.normally(true, usuario));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

const renewPassUsuario = async(req, res) => {
    const salt = bcryptjs.genSaltSync();

    await usuarioModel
        .renewPassUsuario(req.params.id, {
            pass: bcryptjs.hashSync(req.body.pass, salt),
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(usuarioDto.normally(false, "No se pudo actualizar el password"));
            }
            return res.json(usuarioDto.normally(true, "Exito al actualizar el password"));
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
                return res.json(usuarioDto.normally(false, "No se pudo validar el email"));
            }

            return res.json(usuarioDto.normally(true, "Exito al validar el email"));
        })
        .catch((err) => {
            return res.json(usuarioDto.normally(false, err));
        });
};

module.exports = {
    createUsuario,
    loginUsuario,
    renewPassUsuario,
    validEmail
};