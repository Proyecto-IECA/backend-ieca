const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/", controller.getPerfiles);
router.postAsync("/usuario", controller.addPerfil);
router.postAsync("/vacante", controller.addPerfilVacante);
router.getAsync("/usuario/:id", controller.getPerfilesUsuario);
router.getAsync("/vacante/:id", controller.getPerfilesVacante);


module.exports = router;