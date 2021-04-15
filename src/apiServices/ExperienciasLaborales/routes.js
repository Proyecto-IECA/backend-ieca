const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addExpLaboral);
router.getAsync("/:id", controller.getExpLaborales);
router.putAsync("/:id", controller.updateExpLaboral);
router.deleteAsync("/:id", controller.deleteExpLaboral);

module.exports = router;