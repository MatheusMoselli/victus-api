const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = Schema({
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

const pointModel = mongoose.model("Point", pointSchema);

export default pointModel;