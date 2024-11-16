import mongoose from "mongoose";
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  status: {
    type: String,
    default: "pending",
  },
  submittedOn: { type: Date, default: Date.now },
});

const assignmentModel = new mongoose.model("Assignment", assignmentSchema);
export default assignmentModel;
