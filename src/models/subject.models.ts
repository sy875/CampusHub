import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      require: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
      index: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    descripiton: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
