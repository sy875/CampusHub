import mongoose from "mongoose";
import { CourseSession } from "./courseSession.models";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseSession",
    },
  },
  { timestamps: true }
);
