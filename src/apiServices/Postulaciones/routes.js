const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de postulaciones
router.postAsync("/", controller.addPostulacion);
router.getAsync("/:id", controller.getPostulante);
router.getAsync("/realizadas/:id", controller.getPostulaciones);
router.getAsync("/validar/:id/:idv", controller.getPostulacion);
router.getAsync("/cancelar/:id", controller.cancelPostulacion);
router.getAsync("/aceptar/:id", controller.aceptarPostulacion);
router.putAsync("/rechazar/:id", controller.rechazarPostulacion);
router.deleteAsync("/:id", controller.deletePostulacion);

module.exports = router;