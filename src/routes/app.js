// Importación de las librarías necesarias
const Router = require("express");
const usuarios = require("../apiServices/Usuarios/routes");
const cursosCert = require("../apiServices/CursosCertificaciones/routes");
const expAcademicas = require("../apiServices/ExperienciasAcademicas/routes");
const expLaborales = require("../apiServices/ExperienciasLaborales/routes");
const sucursales = require("../apiServices/Sucursales/routes");
const habilidades = require("../apiServices/Habilidades/routes");
const valores = require("../apiServices/Valores/routes");
const idiomas = require("../apiServices/Idiomas/routes");
const perfiles = require("../apiServices/Perfiles/routes");
const vacantes = require("../apiServices/Vacantes/routes");
const vacantesFav = require("../apiServices/VacantesFavoritas/routes");
const postulaciones = require("../apiServices/Postulaciones/routes");
const resenias = require("../apiServices/Resenias/routes");
const notificaciones = require("../apiServices/Notificaciones/routes");
const validaciones = require("../apiServices/Usuarios/middlewares/routes");
const vistasVacante = require("../apiServices/VistasVacante/routes");
const vinculacion = require("../apiServices/Vinculacion/routes");
const { validJWT } = require("../apiServices/shared/middlewares/validar-jwt");

// Configuracion de las rutas para las API
const router = Router();
router.use("/usuarios", usuarios);
router.use("/cursos-certificaciones", cursosCert);
router.use("/experiencias-academicas", expAcademicas);
router.use("/experiencias-laborales", expLaborales);
router.use("/sucursales", sucursales);
router.use("/habilidades", habilidades);
router.use("/valores", valores);
router.use("/idiomas", idiomas);
router.use("/perfiles", perfiles);
router.use("/vacantes", vacantes);
router.use("/vacantes-favoritas", vacantesFav);
router.use("/vistas-vacantes", vistasVacante);
router.use("/postulaciones", postulaciones);
router.use("/resenias", resenias);
router.use("/notificaciones", notificaciones);
router.use("/validar", validaciones);
router.use("/vincular-cuenta", vinculacion);

module.exports = router;