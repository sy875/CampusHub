import mongoose from "mongoose";
import { User } from "./user.models";

const ApiKeysSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const ApiKeys = mongoose.model("ApiKeysSchema", ApiKeysSchema);
