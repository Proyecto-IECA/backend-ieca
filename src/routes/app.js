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

module.exports = router;