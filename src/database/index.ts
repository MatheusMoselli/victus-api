import mongoose from "mongoose";

class DbConnection {
  public dbUrl: string = process.env.MONGODB_URL;

  constructor() {
    this.dbConnect();
  }

  private dbConnect() {
    mongoose.connect(this.dbUrl, { 
      useCreateIndex: true, 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false, 
    }).then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));
  }
};

export default DbConnection;