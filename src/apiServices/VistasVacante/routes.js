const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addVistaVacante);
router.getAsync("/:id", controller.getVistasUsuario);

module.exports = router;