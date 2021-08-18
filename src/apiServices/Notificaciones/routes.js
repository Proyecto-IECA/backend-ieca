const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de notificaciones
router.postAsync("/", controller.addNotificacion);
router.getAsync("/:id", controller.getNotificaciones);
router.getAsync("/ver/:id", controller.verNotificacion);
router.getAsync("/sin-ver/:id", controller.obtenerNumeroNotificaciones);

module.exports = router;