const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/pendientes/:id", controller.getUsuariosEvaluar);

module.exports = router;