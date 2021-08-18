const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de vistas vacante
router.postAsync("/", controller.addVistaVacante);
router.getAsync("/:id", controller.getVistasUsuario);

module.exports = router;