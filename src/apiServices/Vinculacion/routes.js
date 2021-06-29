const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.getAsync("/:curp", controller.vinculacionCuenta);

module.exports = router;