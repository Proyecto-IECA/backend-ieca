const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/:id", controller.getVacantes);
router.postAsync("/", controller.addVacante);
router.getAsync("/vacante/:id", controller.getVacante);
router.getAsync("/empresa/:id", controller.getVacantesEmpresa);
router.putAsync("/:id", controller.updateVacante);
router.deleteAsync("/:id", controller.deleteVacante);
router.getAsync("/postulantes/:id", controller.getPostulantes);
router.getAsync("/publicar/:id", controller.publicarVacante);
router.getAsync("/no-publicar/:id", controller.noPublicarVacante);
router.getAsync("/cerrar/:id", controller.cerrarVacante);
router.getAsync("/abrir/:id", controller.abrirVacante);

module.exports = router;