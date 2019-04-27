const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  events: [
    {
      type: ObjectId,
      ref: "Event"
    }
  ]
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
