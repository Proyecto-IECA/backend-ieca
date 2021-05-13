const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/empresa/:id", controller.getComentariosEmpresa);
router.postAsync("/", controller.addComentario);
router.putAsync("/:id", controller.updateComentario);
router.deleteAsync("/:id", controller.deleteComentario);

module.exports = router;