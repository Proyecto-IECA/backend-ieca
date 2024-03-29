const sucursalModel = require("./model");
const sucursalDto = require("../shared/dto");

// Función para obtener las sucursales
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

// Función para gregar una nueva sucursal
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

// Función para actualizar una sucursal
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
                        "Ocurrió un error al actualizar la sucursal"
                    )
                );
            }

            return res.json(
                sucursalDto.normally(true, "Éxito al actualizar la sucursal")
            );
        })
        .catch((err) => {
            return res.json(sucursalDto.normally(false, err));
        });
};

// Función para borrar una sucursal
const deleteSucursal = async(req, res) => {
    await sucursalModel
        .deleteSucursal(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.json(
                    sucursalDto.normally(false, "No se pudo eliminar una sucursal")
                );
            }

            return res.json(
                sucursalDto.normally(true, "Éxito al eliminar la sucursal")
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