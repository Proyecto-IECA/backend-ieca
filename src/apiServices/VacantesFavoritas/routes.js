const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de vacantes favoritas
router.postAsync("/", controller.addVacanteFav);
router.getAsync("/:id", controller.getVacantesFav);
router.deleteAsync("/:id", controller.deleteVacanteFav);

module.exports = router;