import mongoose from "mongoose";

interface IType {
  name: string;
};

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

export default mongoose.model<IType>("Type", typeSchema);