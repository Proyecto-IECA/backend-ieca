const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/", controller.getVacantes);
router.postAsync("/", controller.addVacante);
router.getAsync("/:id", controller.getVacantesEmpresa);
router.putAsync("/:id", controller.updateVacante);
router.deleteAsync("/:id", controller.deleteVacante);

module.exports = router;