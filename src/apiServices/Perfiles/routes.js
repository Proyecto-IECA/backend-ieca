const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/", controller.getPerfiles);
router.postAsync("/", controller.addPerfil);
router.getAsync("/:id", controller.getPerfilesUsuario);

module.exports = router;