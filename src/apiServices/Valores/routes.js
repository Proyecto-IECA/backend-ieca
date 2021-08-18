const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de valores
router.getAsync("/", controller.getValores);
router.postAsync("/", controller.addValor);
router.getAsync("/:id", controller.getValoresUsuario);

module.exports = router;