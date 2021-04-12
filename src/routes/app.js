const Router = require("express");
const usuarios = require("../apiServices/Usuarios/routes");
const cursosCert = require("../apiServices/CursosCertificaciones/routes");

const router = Router();
router.use("/usuarios", usuarios);
router.use("/cursos-certificaciones", cursosCert);

module.exports = router;