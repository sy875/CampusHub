import mongoose from "mongoose";
import { Branch } from "./branch.models";

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
  },
  { _id: false }
);

const semesterSchema = new mongoose.Schema(
  {
    semesterNumber: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    subjects: [subjectSchema],
  },
  { _id: false }
);

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
      trime: true,
      lowercase: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    semesters: [semesterSchema],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
