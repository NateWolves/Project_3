const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const auth = require('../../middleware/auth')

router.route("/:tripId")
  .get(eventController.findAllByTrip);

router.route("/")
  .post(eventController.create);

router.route("/:eventId")
  .put(auth, eventController.update)
  .delete(auth, eventController.delete);

module.exports = router;
