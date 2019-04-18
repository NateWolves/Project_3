const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  location: {
    name: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      require: true
    },
    lon: {
      type: Number,
      require: true
    }
  },
  date: {
    type: Date
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
