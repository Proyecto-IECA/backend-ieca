const jwt = require("jsonwebtoken");
const jwtDto = require("../dto");
const usuarioModel = require("../../Usuarios/model");

const validJWT = async(req, res, next) => {
    const token = req.header("x-token");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        await usuarioModel
            .getUsuario(payload.id)
            .then((usuario) => {
                next();
            })
            .catch((err) => {
                return res.json(jwtDto.normally(false, "Token invalido"));
            });
    } catch (error) {
        return res.json(jwtDto.normally(false, "Token invalido"));
    }
};

module.exports = {
    validJWT,
};