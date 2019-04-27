const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    defualt: "event"
  },
  location: {
    name: {
      type: String,
      // required: true
    },
    lat: {
      type: Number,
      // require: true
    },
    lon: {
      type: Number,
      // require: true
    }
  },
  // startDate: {
  //   type: Date
  // },
  // endDate: {
  //   type: Date
  // }
  startDate: {
    type: String
  },
  endDate: {
    type: String
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
