import mongoose from "mongoose";

function dbConnect() {
  mongoose.connect(process.env.MONGODB_URL, { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false, 
  }).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
}

dbConnect();