const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/:userId")
  .get(eventController.findAll)
  .post(eventController.create);

router.route("/:userId/:eventId")
  .put(eventController.update)
  .delete(eventController.delete);

module.exports = router;
