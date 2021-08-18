const idiomaModel = require("./model");
const idiomaDto = require("../shared/dto");

// Función para obtener los idiomas
const getIdiomas = async(req, res) => {
    await idiomaModel
        .getIdiomas()
        .then((idiomas) => {
            return res.json(idiomaDto.normally(true, idiomas));
        })
        .catch((err) => {
            return res.json(idiomaDto.normally(false, err));
        });
};

// Función para obtener los idiomas de un usuario
const getIdiomasUsuario = async(req, res) => {
    await idiomaModel
        .getIdiomasUsuario(req.params.id)
        .then((idiomas) => {
            return res.json(idiomaDto.normally(true, idiomas));
        })
        .catch((err) => {
            return res.json(idiomaDto.normally(false, err));
        });
};

// Función para agregar un nuevo idioma
const addIdioma = async(req, res) => {
    const idiomas = await idiomaModel
        .getIdiomasUsuario(req.body.id_usuario)
        .catch((err) => {
            return res.json(idiomaDto.normally(false, err));
        });

    id_idiomas = [];
    idiomas.forEach((idioma) => {
        id_idiomas.push(idioma.id_idioma);
    });

    await idiomaModel
        .deleteIdiomas(req.body.id_usuario, id_idiomas)
        .catch((err) => {
            return res.json(idiomaDto.normally(false, err));
        });

    const idiomasNew = req.body.idiomas;

    idiomasNew.forEach(async(idioma) => {
        await idiomaModel
            .addIdioma(idioma.descripcion, req.body.id_usuario)
            .catch((err) => {
                return res.json(idiomaDto.normally(false, err));
            });
    });

    return res.json(idiomaDto.normally(true, idiomasNew));
};

module.exports = {
    getIdiomas,
    getIdiomasUsuario,
    addIdioma,
};