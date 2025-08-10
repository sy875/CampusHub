import mongoose from "mongoose";
import { Branch } from "./branch.models";

const courseSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    code: {
      type: String,
      required: true,
      index: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
       type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    semesters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
