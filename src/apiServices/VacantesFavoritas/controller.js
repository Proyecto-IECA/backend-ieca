const vacanteFavModel = require("./model");
const vacanteFavDto = require("../shared/dto");

const addVacanteFav = async(req, res) => {
    await vacanteFavModel
        .addVacanteFav({
            id_usuario_fk: req.body.id_usuario_fk,
            id_vacante_fk: req.body.id_vacante_fk,
        })
        .then((vacanteFav) => {
            return res.json(
                vacanteFavDto.normally(
                    true,
                    "Exito al guardar la vacante como favorita"
                )
            );
        })
        .catch((err) => {
            return res.json(vacanteFavDto.normally(true, err));
        });
};

const deleteVacanteFav = async(req, res) => {
    await vacanteFavModel
        .deleteVacanteFav(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    vacanteFavDto.normally(
                        false,
                        "Ocurrio un error al eliminar la vacante como favorita"
                    )
                );
            }

            return res.json(
                vacanteFavDto.normally(
                    true,
                    "Exito al eliminar la vacante como favorita"
                )
            );
        })
        .catch((err) => {
            return res.json(vacanteFavDto.normally(false, err));
        });
};

const getVacantesFav = async(req, res) => {
    await vacanteFavModel
        .getVacantesFav(req.params.id)
        .then((vacantesFav) => {
            return res.json(vacanteFavDto.normally(true, vacantesFav));
        })
        .catch((err) => {
            return res.json(vacanteFavDto.normally(false, err));
        });
};

module.exports = {
    addVacanteFav,
    deleteVacanteFav,
    getVacantesFav,
};