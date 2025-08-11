import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import ApiResponse from "../utils/api-response";
import { User } from "../models/user.models";
import { ApiError } from "../utils/api-error";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await User.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, allUsers, "All users fetched successfully"));
});

export const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(200, "User does not exist");
  }
  user.role = role;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Role changed successfully"));
});