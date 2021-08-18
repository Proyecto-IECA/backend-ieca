const valorModel = require("./model");
const valorDto = require("../shared/dto");

// Función para obtener los valores
const getValores = async(req, res) => {
    await valorModel
        .getValores()
        .then((valores) => {
            return res.json(valorDto.normally(true, valores));
        })
        .catch((err) => {
            return res.json(valorDto.normally(false, err));
        });
};

// Función para obtener los valores del usuario
const getValoresUsuario = async(req, res) => {
    await valorModel
        .getValoresUsuario(req.params.id)
        .then((valores) => {
            return res.json(valorDto.normally(true, valores));
        })
        .catch((err) => {
            return res.json(valorDto.normally(false, err));
        });
};

// Función para agregar un valor nuevo
const addValor = async(req, res) => {
    const valores = await valorModel
        .getValoresUsuario(req.body.id_usuario)
        .catch((err) => {
            return res.json(valorDto.normally(false, err));
        });

    id_valores = [];
    valores.forEach((valor) => {
        id_valores.push(valor.id_valor);
    });

    await valorModel
        .deleteValores(req.body.id_usuario, id_valores)
        .catch((err) => {
            return res.json(valorDto.normally(false, err));
        });

    const valoresNew = req.body.valores;

    valoresNew.forEach(async(valor) => {
        await valorModel
            .addValor(valor.descripcion, req.body.id_usuario)
            .catch((err) => {
                return res.json(valorDto.normally(false, err));
            });
    });

    return res.json(valorDto.normally(true, valoresNew));
};

module.exports = {
    getValores,
    getValoresUsuario,
    addValor,
};