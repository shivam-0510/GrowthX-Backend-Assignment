import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignmentsSubmitted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignment",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const userModel = new mongoose.model("User", userSchema);
export default userModel;
