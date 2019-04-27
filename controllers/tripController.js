const db = require("../models");

module.exports = {
  findAllByUser: function (req, res) {
    db.User.findOne({ userId: req.params.userId })
      .populate({ path: "trips", options: { sort: { date: -1 } } })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Trip.create(req.body)
      .then(dbTrip => {
        return db.User.findOneAndUpdate({ userId: req.params.userId },
          { $push: { trips: dbTrip._id } }, { new: true });
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.User.findOne({ $in: {  } })
  }
}
