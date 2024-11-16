import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.log(err);
      //throw new err();
    });
};

export default connectDB
