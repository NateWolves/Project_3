const router = require("express").Router();
const userController = require("../../controllers/userController");
const auth = require('../../middleware/auth')

router.route("/:userId")
  .get( auth, userController.findOne);

module.exports = router;
