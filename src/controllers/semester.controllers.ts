import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Course } from "../models/course.models";
import { ApiError } from "../utils/api-error";
import { Subject } from "../models/subject.models";
import { Semester } from "../models/semester.models";
import ApiResponse from "../utils/api-response";

export const createSemester = asyncHandler(
  async (req: Request, res: Response) => {
    const { semesterCode, semesterNumber, duration, subjects } = req.body;

    const subjectsExist = await Subject.find({ _id: { $in: subjects } });
    if (subjectsExist.length != subjects.length) {
      throw new ApiError(404, "One or more subjects not found");
    }

    const semester = await Semester.create({
      semesterCode,
      semesterNumber,
      duration,
      subjects,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, semester, "Semester created successfully"));
  }
);
export const getSemester = asyncHandler(async (req: Request, res: Response) => {
  const { semesterId } = req.params;
  const semester = await Semester.findById(semesterId);
  if (!semester) {
    throw new ApiError(404, "Semster not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, semester, "Successfully fetched semester"));
});
export const getAllSemester = asyncHandler(
  async (req: Request, res: Response) => {
    const semester = await Semester.find({});
    if (!semester) {
      throw new ApiError(404, "Semster not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { allSemesters: semester },
          "Successfuly fetched all semester"
        )
      );
  }
);
export const updateSemester = asyncHandler(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    const { subjects } = req.body;
    const semester = await Semester.findByIdAndUpdate(
      semesterId,
      {
        $set: { subjects },
      },
      { new: true }
    );
    if (!semester) {
      throw new ApiError(404, "Semster not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedSemester: semester },
          "Successfully updated"
        )
      );
  }
);
export const deleteSemester = asyncHandler(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    
    const semester = await Semester.findByIdAndDelete(semesterId);
    if (!semester) {
      throw new ApiError(404, "Semster not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedSemester: semester },
          "Successfully deleted semester"
        )
      );
  }
);
