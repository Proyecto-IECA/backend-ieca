const habilidadModel = require("./model");
const habilidadDto = require("../shared/dto");

// Función para obtener las habilidades
const getHabilidades = async(req, res) => {
    await habilidadModel
        .getHabilidades()
        .then((habilidades) => {
            return res.json(habilidadDto.normally(true, habilidades));
        })
        .catch((err) => {
            return res.json(habilidadDto.normally(false, err));
        });
};

// Función para obtener las habilidades de un usuario
const getHabilidadesUsuario = async(req, res) => {
    await habilidadModel
        .getHabilidadesUsuario(req.params.id)
        .then((habilidades) => {
            return res.json(habilidadDto.normally(true, habilidades));
        })
        .catch((err) => {
            return res.json(habilidadDto.normally(false, err));
        });
};

// Función para agregar una nueva habilidad
const addHabilidad = async(req, res) => {
    const habilidades = await habilidadModel
        .getHabilidadesUsuario(req.body.id_usuario)
        .catch((err) => {
            return res.json(habilidadDto.normally(false, err));
        });

    id_habilidades = [];
    habilidades.forEach((habilidad) => {
        id_habilidades.push(habilidad.id_habilidad);
    });

    await habilidadModel
        .deleteHabilidades(req.body.id_usuario, id_habilidades)
        .catch((err) => {
            return res.json(habilidadDto.normally(false, err));
        });

    const habilidadesNew = req.body.habilidades;

    habilidadesNew.forEach(async(habilidad) => {
        await habilidadModel
            .addHabilidad(habilidad.descripcion, req.body.id_usuario)
            .catch((err) => {
                return res.json(habilidadDto.normally(false, err));
            });
    });

    return res.json(habilidadDto.normally(true, habilidadesNew));
};

module.exports = {
    getHabilidades,
    getHabilidadesUsuario,
    addHabilidad,
};