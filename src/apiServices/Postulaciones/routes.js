const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addPostulacion);
router.getAsync("/:id", controller.getPostulante);
router.getAsync("/realizadas/:id", controller.getPostulaciones);
router.getAsync("/cancelar/:id", controller.cancelPostulacion);
router.getAsync("/aceptar/:id", controller.aceptarPostulacion);
router.getAsync("/rechazar/:id", controller.rechazarPostulacion);
router.deleteAsync("/:id", controller.deletePostulacion);

module.exports = router;