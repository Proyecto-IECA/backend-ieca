const express = require("@awaitjs/express");
const controller = require("./usuario");

const router = express.Router();

router.getAsync("/email/:id", controller.validarEmail);
router.getAsync("/perfil/:id", controller.validarPerfil);
router.getAsync("/token/:id", controller.validarToken);

module.exports = router;