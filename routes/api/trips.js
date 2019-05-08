const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const auth = require('../../middleware/auth')

router.route("/:userId")
  .get( tripController.findAllByUser);

router.route("/")
  .post(tripController.create);

router.route("/:tripId")
  .put( tripController.update)
  .delete( tripController.delete);

module.exports = router;
