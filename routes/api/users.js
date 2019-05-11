const router = require("express").Router();
const userController = require("../../controllers/userController");
const auth = require('../../middleware/auth')

router.route("/:_id")
  .get(  userController.findOne);

module.exports = router;
