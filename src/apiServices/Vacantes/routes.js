const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

// Rutas del CRUD de vacantes
router.postAsync("/", controller.addVacante);
router.putAsync("/generales/:id", controller.getVacantes);
router.getAsync("/vacante/:id/:idU", controller.getVacante);
router.getAsync("/empresa/:id", controller.getVacantesEmpresa);
router.putAsync("/:id", controller.updateVacante);
router.deleteAsync("/:id", controller.deleteVacante);
router.getAsync("/postulantes/:id", controller.getPostulantes);
router.getAsync("/publicar/:id", controller.publicarVacante);
router.getAsync("/no-publicar/:id", controller.noPublicarVacante);
router.getAsync("/cerrar/:id", controller.cerrarVacante);
router.getAsync("/abrir/:id", controller.abrirVacante);
router.getAsync("/numero-postulaciones/:id", controller.getPostulaciones);

module.exports = router;