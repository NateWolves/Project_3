const router = require("express").Router();
const userRoutes = require("./users");
const tripRoutes = require("./trips");
const eventRoutes = require("./events");
const googleRoutes = require("./googleSearch");
const authRoutes = require("./auth");


router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/trips", tripRoutes);
router.use("/googleSearch", googleRoutes);


module.exports = router;
