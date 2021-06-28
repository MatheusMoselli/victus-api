import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  CPF: string;
  premium?: boolean;
  points?: number;
  birthday: Date;
};

const userSchema = new mongoose.Schema({
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

export default mongoose.model<IUser>("User", userSchema);