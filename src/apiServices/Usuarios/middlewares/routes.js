const express = require("@awaitjs/express");
const controller = require("./usuario");

const router = express.Router();

router.getAsync("/email/:id", controller.validarEmail);
router.getAsync("/perfil/:id", controller.validarPerfil);

module.exports = router;