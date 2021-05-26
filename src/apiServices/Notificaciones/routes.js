const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addNotificacion);
router.getAsync("/:id", controller.getNotificaciones);
router.putAsync("/:id", controller.verNotificacion);

module.exports = router;