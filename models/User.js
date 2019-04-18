const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  events: [
    {
      type: ObjectId,
      ref: "Event"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
