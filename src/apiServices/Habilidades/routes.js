const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/", controller.getHabilidades);
router.postAsync("/", controller.addHabilidad);
router.getAsync("/:id", controller.getHabilidadesUsuario);

module.exports = router;