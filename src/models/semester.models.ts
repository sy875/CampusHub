import mongoose from "mongoose";
import {
  AvailableSemesterDurations,
  SemesterDurations,
} from "../utils/Constants";

const semesterSchema = new mongoose.Schema(
  {
    semesterCode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    semesterNumber: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      enum: AvailableSemesterDurations,
      default: SemesterDurations.SIXMONTHS,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

export const Semester = mongoose.model("Semester", semesterSchema);
