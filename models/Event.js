const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  tripId: {
    type: ObjectId,
    ref: "Trip",
    required: true
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
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    }
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
