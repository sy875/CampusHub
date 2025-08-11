import mongoose from "mongoose";
import {
  AudienceType,
  AvailableAudienceType,
  AvailableMaterialType,
} from "../utils/Constants";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    courseSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseSession",
    },
    materialType: {
      type: String,
      enum: AvailableMaterialType,
    },
    materialUrl: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    availableTo: {
      type: [String],
      enum: AvailableAudienceType,
      default: [AudienceType.FACULTY],
    },
  },
  { timestamps: true }
);

export const Material = mongoose.model("Material", materialSchema);
