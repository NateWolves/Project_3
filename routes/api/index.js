const router = require("express").Router();
const userRoutes = require("./users");
const eventRoutes = require("./events");
const googleRoutes = require("./googleSearch");

router.use("/users", userRoutes)
router.use("/events", eventRoutes)
router.use("/api/location", googleRoutes)
router.use("/api/nearby", googleRoutes)

module.exports = router;
