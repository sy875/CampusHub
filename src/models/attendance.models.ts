import mongoose from "mongoose";
import { AttendanceType, AvailableAttendanceType } from "../utils/Constants";

const attendanceScema = new mongoose.Schema(
  {
    courseSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseSession",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: AvailableAttendanceType,
      default: AttendanceType.ABSENT,
    },
    markedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

attendanceScema.index(
  { courseSession: 1, student: 1, markedAt: 1 },
  { unique: true }
);

export const Attendance = mongoose.model("Attendance", attendanceScema);
