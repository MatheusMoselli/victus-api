import mongoose from "mongoose";
const ObjId = mongoose.SchemaTypes.ObjectId;

interface ITicket {
  user_sender: string;
  event_receiver: string;
  created_at?: Date;
};

const ticketSchema = new mongoose.Schema({
  user_sender: {
    type: ObjId,
    ref: "User",
    required: true
  },
  event_receiver: {
    type: ObjId,
    ref: "Event",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model<ITicket>("Ticket", ticketSchema);;