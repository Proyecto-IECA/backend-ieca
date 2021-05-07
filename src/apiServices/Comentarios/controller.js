const comentarioModel = require("./model");
const comentarioDto = require("../shared/dto");

const getComentariosEmpresa = async(req, res) => {
    await comentarioModel
        .getComentariosEmpresa(req.params.id)
        .then((comentarios) => {
            return res.json(comentarioDto.normally(true, comentarios));
        })
        .catch((err) => {
            return res.json(comentarioDto.normally(false, err));
        });
};

module.exports = {
    getComentariosEmpresa,
};