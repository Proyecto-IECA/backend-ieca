const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addVacanteFav);
router.getAsync("/:id", controller.getVacantesFav);
router.deleteAsync("/:id", controller.deleteVacanteFav);

module.exports = router;