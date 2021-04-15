const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addSucursal);
router.getAsync("/:id", controller.getSucursales);
router.putAsync("/:id", controller.updateSucursal);
router.deleteAsync("/:id", controller.deleteSucursal);

module.exports = router;