import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
});

export const Branch = mongoose.model("Branch", branchSchema);
