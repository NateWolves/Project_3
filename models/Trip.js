const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TripSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  tripLocation:{
      address: {
        type: String
      },
      lat: {
        type: Number
      },
      lon: {
        type: Number
      }
  },
  events: [
    {
      type: ObjectId,
      ref: "Event"
    }
  ]
}, 
{
  timestamps: true
});

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
