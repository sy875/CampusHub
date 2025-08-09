import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: String,
    },
    title: {
      type: String,
      required: String,
    },
    descripiton: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
