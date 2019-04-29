const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  trips: [
    {
      type: ObjectId,
      ref: "Trip"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
