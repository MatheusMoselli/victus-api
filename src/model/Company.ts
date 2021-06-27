const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = Schema({
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
  profile_picture: {
    type: String,
  },
  CNPJ: {
    type: String,
    required: true
  },
  many_events: {
    type: Number,
    default: 0
  }
});

const companyModal = mongoose.model("Company", companySchema);
export default companyModal;