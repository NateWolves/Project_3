const db = require("../models");

module.exports = {
  findOne: function(req, res) {
    db.User.findOne({_id: req.params._id })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
}
