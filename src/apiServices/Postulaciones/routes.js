const express = require("@awaitjs/express");
const controller = require("./controller");

const router = express.Router();

router.postAsync("/", controller.addPostulacion);
router.getAsync("/cancelar/:id", controller.cancelPostulacion);
router.deleteAsync("/:id", controller.deletePostulacion);

module.exports = router;