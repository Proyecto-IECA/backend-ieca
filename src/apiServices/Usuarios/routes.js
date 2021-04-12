const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.createUsuario);
router.postAsync("/login", controller.loginUsuario);
router.putAsync("/renewpass/:id", controller.renewPassUsuario);
router.putAsync("/validemail/:id", controller.validEmail);
router.putAsync("/update/:id", controller.updateUsuario);
router.putAsync("/updatefoto/:id", controller.updateFotoUsuario);
router.getAsync("/:id", controller.getUsuario);

module.exports = router;