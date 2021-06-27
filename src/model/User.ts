const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  CPF: {
    type: String,
    required: true
  },
  premium: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  birthday: {
    type: Date,
    required: true
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;