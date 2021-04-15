const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addExpAcademica);
router.getAsync("/:id", controller.getExpAcademicas);
router.putAsync("/:id", controller.updateExpAcademica);
router.deleteAsync("/:id", controller.deleteExpAcademica);

module.exports = router;