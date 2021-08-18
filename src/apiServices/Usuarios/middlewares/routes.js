const express = require("@awaitjs/express");
const controller = require("./usuario");

const router = express.Router();

// Rutas para los middlewares para el usuario, email perfil y token
router.getAsync("/email/:id", controller.validarEmail);
router.getAsync("/perfil/:id", controller.validarPerfil);
router.getAsync("/token/:id", controller.validarToken);

module.exports = router;