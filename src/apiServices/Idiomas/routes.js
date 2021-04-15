const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/", controller.getIdiomas);
router.postAsync("/", controller.addIdioma);
router.getAsync("/:id", controller.getIdiomasUsuario);

module.exports = router;