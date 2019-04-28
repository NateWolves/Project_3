const db = require("../models");

module.exports = {
  findAllByUser: function (req, res) {
    db.User.findOne({ userId: req.params.userId })
      .populate({ 
        path: "trips", 
        options: { sort: { date: -1 } }, 
        populate: { path: "events", options: { sort: { date: 1 } }}
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Trip.create(req.body)
      .then(dbTrip => {
        db.User.findOneAndUpdate({ _id: dbTrip.userId },
          { $push: { trips: dbTrip._id } }, { new: true })
          .then(dbModel => res.json(dbTrip))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Event.deleteMany({ tripId: req.params.tripId })
      .then(dbModel => {
        db.Trip.findOneAndDelete({ _id: req.params.tripId })
          .then(dbModel => {
            db.User.findOneAndUpdate({ trips: req.params.tripId }, 
              { $pull: { trips: req.params.tripId } }, { new: true })
              .then(dbUser => res.json(dbUser))
              .catch(err => res.status(422).json(err));
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
