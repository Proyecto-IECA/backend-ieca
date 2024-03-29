const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de sucursales
router.postAsync("/", controller.addSucursal);
router.getAsync("/:id", controller.getSucursales);
router.putAsync("/:id", controller.updateSucursal);
router.deleteAsync("/:id", controller.deleteSucursal);

module.exports = router;