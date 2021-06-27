const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = Schema({
  name: {
    type: String,
    required: true
  }
})

const typeModel = mongoose.model("Type", typeSchema);
export default typeModel;