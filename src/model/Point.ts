import mongoose from "mongoose";

interface IPoint {
  name: string;
  email: string;
  password: string;
  address: {};
  profile_picture?: string;
  CNPJ: string;
  received_pounds?: number;
  given_points?: number;
};

const pointSchema = new  mongoose.Schema({
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
  address: {
    type: {
      patio: {
        type: String,
        required: true
      },
      CEP: {
        type: String,
        required: true 
      },
      neighborhood: {
        type: String,
        required: true 
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true 
      }
    },
    required: true
  },
  profile_picture: {
    type: String
  },
  CNPJ: {
    type: String,
    required: true
  },
  received_pounds: {
    type: Number,
    default: 0
  },
  given_points: {
    type: Number,
    default: 0
  }
})

export default mongoose.model<IPoint>("Point", pointSchema);;