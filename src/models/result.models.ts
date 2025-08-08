import mongoose from "mongoose";

const subjectMarkSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    obtainedMarks: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema({
  courseSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseSession",
    required: true,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  subjectWiseMarks: [subjectMarkSchema],
  totalMarks: {
    type: Number,
    required: true,
  },
  isPromoted: {
    type: Boolean,
    required: true,
  },
});

export const Result = mongoose.model("Result", resultSchema);
