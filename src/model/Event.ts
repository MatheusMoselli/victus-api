import mongoose from "mongoose";
const ObjId = mongoose.SchemaTypes.ObjectId;

interface IEvent {
  name: string;
  address: {};
  profile_picture?: string;
  many_participants: number;
  details: string;
  necessary_points: number;
  date: Date;
  creator: string;
  type: string;
}

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: {
      patio: {
        type: String,
        required: true,
      },
      CEP: {
        type: String,
        required: true,
      },
      neighborhood: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  profile_picture: {
    type: String,
  },
  details: {
    type: String,
    required: true,
  },
  many_participants: {
    type: Number,
    default: 0,
  },
  necessary_points: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: ObjId,
    ref: "Company",
  },
  type: {
    type: ObjId,
    ref: "Type",
  },
});

export default mongoose.model<IEvent>("Event", eventSchema);
