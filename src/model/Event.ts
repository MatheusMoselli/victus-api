const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema({
  name: {
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
    type: String,
  },
  necessary_points: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: { 
    type: Schema.Type.ObjectId, 
    ref: "Company" 
  }
})

const eventModal = mongoose.model("Event", eventSchema);
export default eventModal;