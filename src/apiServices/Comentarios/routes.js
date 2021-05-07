const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/empresa/:id", controller.getComentariosEmpresa);

module.exports = router;