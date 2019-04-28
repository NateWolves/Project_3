const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  tripId: {
    type: ObjectId,
    ref: "Trip"
  },
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
