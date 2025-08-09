import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Branch } from "../models/branch.models";
import { ApiError } from "../utils/api-error";
import ApiResponse from "../utils/api-response";

export const crateBranch = asyncHandler(async (req: Request, res: Response) => {
  const { title, description = "" } = req.body;
  const duplicateBranch = title.trim().toLowerCase();
  const branch = await Branch.findOne({ title: duplicateBranch });
  console.log(duplicateBranch, branch);
  if (branch) {
    throw new ApiError(409, "Branch already exist");
  }
  const newBranch = await Branch.create({
    title,
    description,
    createdBy: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { branch: newBranch }, "Successfully created"));
});

export const getBranch = asyncHandler(async (req: Request, res: Response) => {
  const { branchId } = req.params;
  const branch = await Branch.findById(branchId);
  if (!branch) {
    throw new ApiError(404, "Branch does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, branch, "Branch fetched successfully"));
});
export const getAllBranch = asyncHandler(
  async (req: Request, res: Response) => {
    const branch = await Branch.find({});

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { allBranch: branch },
          "All Branch fetched successfully"
        )
      );
  }
);
export const updateBranch = asyncHandler(
  async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const { description } = req.body;
    const branch = await Branch.findByIdAndUpdate(
      branchId,
      {
        $set: {
          description,
        },
      },
      { new: true }
    );
    if (!branch) {
      throw new ApiError(404, "Branch does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedBranch: branch },
          "Branch updated successfully"
        )
      );
  }
);
export const deleteBranch = asyncHandler(
  async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const branch = await Branch.findByIdAndDelete(branchId);
    if (!branch) {
      throw new ApiError(404, "Branch does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedBranch: branch },
          "Branch deleted successfully"
        )
      );
  }
);
