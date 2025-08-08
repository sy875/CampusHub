import mongoose from "mongoose";
import { User } from "./user.models";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    effectiveFrom: {
      type: Date,
      required: true,
      default: Date.now,
    },
    effectiveTo: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
