const perfilModel = require("./model");
const perfilDto = require("../shared/dto");

// Función para obtener los perfiles
const getPerfiles = async(req, res) => {
    await perfilModel
        .getPerfiles()
        .then((perfiles) => {
            return res.json(perfilDto.normally(true, perfiles));
        })
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });
};

// Función para obtener los perfiles del usuario
const getPerfilesUsuario = async(req, res) => {
    await perfilModel
        .getPerfilesUsuario(req.params.id)
        .then((perfiles) => {
            return res.json(perfilDto.normally(true, perfiles));
        })
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });
};

// Función para agregar un nuevo perfil
const addPerfil = async(req, res) => {
    const perfiles = await perfilModel
        .getPerfilesUsuario(req.body.id_usuario)
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });

    id_perfiles = [];
    perfiles.forEach((perfil) => {
        id_perfiles.push(perfil.id_perfil);
    });

    await perfilModel
        .deletePerfiles(req.body.id_usuario, id_perfiles)
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });

    const perfilesNew = req.body.perfiles;

    perfilesNew.forEach(async(perfil) => {
        await perfilModel
            .addPerfil(perfil.descripcion, req.body.id_usuario)
            .catch((err) => {
                return res.json(perfilDto.normally(false, err));
            });
    });

    return res.json(perfilDto.normally(true, perfilesNew));
};

// Función para obtener los perfiles de la vacante
const getPerfilesVacante = async(req, res) => {
    await perfilModel
        .getPerfilesVacante(req.params.id)
        .then((perfiles) => {
            return res.json(perfilDto.normally(true, perfiles));
        })
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });
};

// Función para agregar un nuevo perfil a la vacante
const addPerfilVacante = async(req, res) => {
    const perfiles = await perfilModel
        .getPerfilesVacante(req.body.id_vacante)
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });

    id_perfiles = [];
    perfiles.forEach((perfil) => {
        id_perfiles.push(perfil.id_perfil);
    });

    await perfilModel
        .deletePerfilesVacante(req.body.id_vacante, id_perfiles)
        .catch((err) => {
            return res.json(perfilDto.normally(false, err));
        });

    const perfilesNew = req.body.perfiles;

    perfilesNew.forEach(async(perfil) => {
        await perfilModel
            .addPerfilVacante(perfil.descripcion, req.body.id_vacante)
            .catch((err) => {
                return res.json(perfilDto.normally(false, err));
            });
    });

    return res.json(perfilDto.normally(true, perfilesNew));
};

module.exports = {
    getPerfiles,
    getPerfilesUsuario,
    addPerfil,
    getPerfilesVacante,
    addPerfilVacante,
};