const db = require("../models");

// req.user.name

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
        return db.Trip.findOneAndUpdate({ _id: req.params.tripId }, 
          { $push: { events: dbEvent._id } }, { new: true });
      })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event.findOneAndUpdate({ _id : req.params.eventId }, req.body, { new: true })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.tripId }, { $pull: { events: req.params.eventId } })
      .then(dbTrip => { 
        db.Event.deleteOne({ _id: req.params.eventId })
          .then(dbEvent => res.json(dbEvent))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
}
