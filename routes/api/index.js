const router = require("express").Router();
const userRoutes = require("./users");
const tripRoutes = require("./trips");
const eventRoutes = require("./events");
const googleRoutes = require("./googleSearch");

router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/trips", tripRoutes);
router.use("/location", googleRoutes);
router.use("/nearby", googleRoutes);

module.exports = router;
