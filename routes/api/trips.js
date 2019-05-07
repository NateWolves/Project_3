const router = require("express").Router();
const tripController = require("../../controllers/tripController");
const auth = require('../../middleware/auth')

router.route("/:userId")
  .get(auth, tripController.findAllByUser);

router.route("/")
  .post(auth, tripController.create);

router.route("/:tripId")
  .put(auth, tripController.update)
  .delete( auth, tripController.delete);

module.exports = router;
