const Router = require("express");
const usuarios = require("../apiServices/Usuarios/routes");

const router = Router();
router.use("/usuarios", usuarios);

module.exports = router;