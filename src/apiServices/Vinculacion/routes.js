const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas para la vinculación de una cuenta
router.getAsync("/:curp", controller.vinculacionCuenta);

module.exports = router;