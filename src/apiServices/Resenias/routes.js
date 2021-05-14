const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/:id", controller.getReseniasUsuario);
router.getAsync("/pendientes/:id", controller.getUsuariosEvaluar);
router.postAsync("/", controller.calificar);

module.exports = router;