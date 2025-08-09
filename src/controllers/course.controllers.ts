import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Branch } from "../models/branch.models";
import { ApiError } from "../utils/api-error";
import { Semester } from "../models/semester.models";
import { Course } from "../models/course.models";
import ApiResponse from "../utils/api-response";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { branch, code, title, description, semesters } = req.body;

    const branchExist = await Branch.findById(branch);

    if (!branchExist) {
      throw new ApiError(404, "Branch does not exist");
    }

    if (semesters) {
      const semestersExist = await Semester.find({ _id: { $in: semesters } });
      if (semestersExist.length !== semesters.length) {
        throw new ApiError(400, "One or more semesters is invalid");
      }
    }

    const newCourse = await Course.create({
      branch,
      code,
      title,
      description,
      semesters,
      createdBy: req.user._id,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { course: newCourse },
          "Course created successfully"
        )
      );
  }
);

export const getAllCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const allCourse = await Course.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, allCourse, "All Course fetched successfully"));
  }
);
export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course fetched successfully"));
});
export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByIdAndUpdate(courseId, {
      $set: {
        title,
        description,
      },
    });
    if (!course) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedCourse: course },
          "Course fetched successfully"
        )
      );
  }
);
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedCourse: course },
          "Course fetched successfully"
        )
      );
  }
);
