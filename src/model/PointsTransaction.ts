import mongoose from "mongoose";
const ObjId = mongoose.SchemaTypes.ObjectId;

interface ITransaction {
  points: number;
  created_at?: Date;
  user_receiver: string;
  point_sender: string;
}

const pointTransactionSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true 
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_receiver: {
    type: ObjId,
    ref: "User",
    required: true
  },
  point_sender: {
    type: ObjId,
    ref: "Point",
    required: true
  }
});

export default mongoose.model<ITransaction>("Point Transaction", pointTransactionSchema);