const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/:tripId")
  .get(eventController.findAllByTrip);

router.route("/")
  .post(eventController.create);

router.route("/:eventId")
  .put(eventController.update)
  .delete(eventController.delete);

module.exports = router;
