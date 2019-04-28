const db = require("../models");

module.exports = {
  findAllByTrip: function(req, res) {
    db.Trip.findOne({ _id: req.params.tripId })
      .populate({ path: "events", options: { sort: { date: 1 } } })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Event.create(req.body)
      .then(dbEvent => {
        db.Trip.findOneAndUpdate({ _id: dbEvent.tripId }, 
          { $push: { events: dbEvent._id } }, { new: true })
          .then(dbModel => res.json(dbEvent))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event.findOneAndUpdate({ _id : req.params.eventId }, req.body, { new: true })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  delete: function (req, res) {
    db.Event.findOneAndDelete({ _id: req.params.eventId })
      .then(dbModel => {
        db.Trip.findAndUpdate({ $in: { events: eventId } }, { $pull: { events: eventId } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
};
