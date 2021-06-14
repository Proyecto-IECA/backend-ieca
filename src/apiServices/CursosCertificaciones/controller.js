const cursoCertModel = require("./model");
const cursoCertDto = require("../shared/dto");

const getCursosCert = async(req, res) => {
    await cursoCertModel
        .getCursosCert(req.params.id)
        .then((cursosCert) => {
            return res.json(cursoCertDto.normally(true, cursosCert));
        })
        .catch((err) => {
            return res.json(cursoCertDto.normally(false, err));
        });
};

const addCursoCert = async(req, res) => {
    await cursoCertModel
        .addCursoCert({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            link: req.body.link,
            id_usuario_fk: req.body.id_usuario_fk
        })
        .then((cursoCert) => {
            return res.json(cursoCertDto.normally(true, cursoCert));
        })
        .catch((err) => {
            return res.json(cursoCertDto.normally(false, err));
        });
};

const updateCursoCert = async(req, res) => {
    await cursoCertModel
        .updateCursoCert(req.params.id, {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            link: req.body.link,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    cursoCertDto.normally(
                        false,
                        "Ocurrió un error al actualizar el curso"
                    )
                );
            }
            return res.json(
                cursoCertDto.normally(true, "Éxito al actualizar el curso")
            );
        })
        .catch((err) => {
            return res.json(cursoCertDto.normally(false, err));
        });
};

const deleteCursoCert = async(req, res) => {
    await cursoCertModel
        .deleteCursoCert(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    cursoCertDto.normally(false, "No se pudo eliminar el curso")
                );
            }

            return res.json(cursoCertDto.normally(true, "Éxito al elimiar el curso"));
        })
        .catch((err) => {
            return res.json(cursoCertDto.normally(false, err));
        });
};

module.exports = {
    getCursosCert,
    addCursoCert,
    updateCursoCert,
    deleteCursoCert,
};