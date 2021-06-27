const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointTransactionSchema = Schema({
  points: {
    type: Number,
    required: true 
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_receiver: {
    type: Schema.ObjectId,
    required: true
  },
  point_sender: {
    type: Schema.ObjectId,
    required: true
  }
});

const pointTransactionModel = mongoose.model("Point Transaction", pointTransactionSchema);
export default pointTransactionModel;