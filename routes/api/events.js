const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/:userId")
  .get(eventController.findAll);

module.exports = router;