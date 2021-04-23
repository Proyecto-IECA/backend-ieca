const sucursalModel = require("./model");
const sucursalDto = require("../shared/dto");

const getSucursales = async(req, res) => {
    await sucursalModel
        .getSucursales(req.params.id)
        .then((sucursales) => {
            return res.json(sucursalDto.normally(true, sucursales));
        })
        .catch((err) => {
            return res.json(sucursalDto.normally(false, err));
        });
};

const addSucursal = async(req, res) => {
    await sucursalModel
        .addSucursal({
            ubicacion: req.body.ubicacion,
            nombre: req.body.nombre,
            id_usuario_fk: req.body.id_usuario_fk,
        })
        .then((sucursal) => {
            return res.json(sucursalDto.normally(true, sucursal));
        })
        .catch((err) => {
            return res.json(sucursalDto.normally(false, err));
        });
};

const updateSucursal = async(req, res) => {
    await sucursalModel
        .updateSucursal(req.params.id, {
            ubicacion: req.body.ubicacion,
            nombre: req.body.nombre,
        })
        .then((result) => {
            if (result[0] === 0) {
                return res.json(
                    sucursalDto.normally(
                        false,
                        "Ocurrio un error al actualizar la sucursal"
                    )
                );
            }

            return res.json(
                sucursalDto.normally(true, "Exito al actualizar la sucursal")
            );
        })
        .catch((err) => {
            return res.json(sucursalDto.normally(false, err));
        });
};

const deleteSucursal = async(req, res) => {
    await sucursalModel
        .deleteSucursal(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    sucursalDto.normally(false, "No de pudo eliminar una sucursal")
                );
            }

            return res.json(
                sucursalDto.normally(true, "Exito al eliminar la sucursal")
            );
        })
        .catch((err) => {
            return res.json(sucursalDto.normally(false, err));
        });
};

module.exports = {
    getSucursales,
    addSucursal,
    updateSucursal,
    deleteSucursal,
};