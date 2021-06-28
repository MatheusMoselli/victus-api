import mongoose from "mongoose";

interface ICompany {
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  CNPJ: string;
  many_events?: number;
}

const companySchema = new mongoose.Schema<ICompany>({
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


export default mongoose.model<ICompany>("Company", companySchema);