import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema({
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
  assignmentsRecieved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignment",
    },
  ],
  createdAt: {type: Date,
    default: Date.now,},
  updated: {type: Date,
    default: Date.now,},
});

const adminModel = new mongoose.model("Admin", adminSchema);
export default adminModel;
