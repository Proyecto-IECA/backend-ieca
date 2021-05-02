const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/:id", controller.getVacantes);
router.postAsync("/", controller.addVacante);
router.getAsync("/:id", controller.getVacante);
router.getAsync("/empresa/:id", controller.getVacantesEmpresa);
router.putAsync("/:id", controller.updateVacante);
router.deleteAsync("/:id", controller.deleteVacante);
router.getAsync("/postulantes/:id", controller.getPostulantes);

module.exports = router;