const router = require("express").Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const userController = require("../../controllers/userController");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENTID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// router.route("/:userId")
//   .get(eventController.findAll)
//   .post(eventController.create);

// router.route("/:userId/:eventId")
//   .put(eventController.update)
//   .delete(eventController.delete);

router.get("/:userId", checkJwt, userController.findOne);

module.exports = router;
