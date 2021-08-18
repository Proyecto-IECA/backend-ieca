const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de curso y/o certificación
router.postAsync("/", controller.addCursoCert);
router.getAsync("/:id", controller.getCursosCert);
router.putAsync("/:id", controller.updateCursoCert);
router.deleteAsync("/:id", controller.deleteCursoCert);

module.exports = router;