const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.findOne({ userId: req.params.userId })
      .populate({ path: "events", options: { sort: { date: 1 } } })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Event.create(req.body)
      .then(dbEvent => {
        return db.User.findOneAndUpdate({ userId: req.params.userId }, 
          { $push: { events: dbEvent._id } }, { new: true });
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event.findOne({ eventId: req.params.eventId }, req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    db.User.findOne({ userId: req.params.userId }, { $pull: { events: req.params.eventId } })
      .then(dbUser => { 
        db.Event.deleteOne({ _id: req.params.eventId })
          .then(dbEvent => res.json(dbEvent))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  }
}
