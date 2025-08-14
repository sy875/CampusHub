import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { CourseSession } from "../models/courseSession.models";
import { ApiError } from "../utils/api-error";
import { Subject } from "../models/subject.models";
import { Result } from "../models/result.models";
import ApiResponse from "../utils/api-response";
import { User } from "../models/user.models";
import { AvailableUserRoles, UserRolesEnum } from "../utils/Constants";

export const createResult = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      student,
      courseSession,
      semester,
      subjectWiseMarks,
      totalMarks,
      isPromoted,
    } = req.body;

    const studentExist = await User.findById(student);
    if (!studentExist) {
      throw new ApiError(404, "Student does not exist");
    }
    const courseSessionExist = await CourseSession.findById(courseSession);
    if (!courseSessionExist) {
      throw new ApiError(404, "Course Session does not exist");
    }
    const subjectIds = subjectWiseMarks.map(
      (sub: { subject: string }) => sub.subject
    );
    const subjectsExistCount = await Subject.countDocuments({
      _id: { $in: subjectIds },
    });

    if (subjectsExistCount !== subjectIds.length) {
      throw new ApiError(404, "One or more subject does not exist");
    }

    const result = await Result.create({
      student,
      courseSession,
      semester,
      subjectWiseMarks,
      totalMarks,
      isPromoted,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, result, "Result created successfully"));
  }
);

export const getAllResult = asyncHandler(
  async (req: Request, res: Response) => {
    const allResult = await Result.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, allResult, "Result fetched successfully"));
  }
);

export const getResultByStudentId = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    if (
      req.user._id.toString() != studentId &&
      req.user.role == UserRolesEnum.STUDENT
    ) {
      throw new ApiError(403, "You are not allowed for this operation");
    }

    const result = await Result.find({ student: studentId })
      .select("-createdBy")
      .populate({
        path: "student",
        select: "-_id username",
      })
      .populate({
        path: "courseSession",
        select: "-_id code",
      })
      .populate({
        path: "semester",
        select: "-_id semesterCode semesterNumber",
      });

    if (!result) {
      throw new ApiError(404, "Result does not exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Result fetched successfully"));
  }
);
export const getResult = asyncHandler(async (req: Request, res: Response) => {
  const { resultId } = req.params;

  const result = await Result.findById(resultId);

  if (!result) {
    throw new ApiError(404, "Result does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Result fetched successfully"));
});

export const updateResult = asyncHandler(
  async (req: Request, res: Response) => {
    const { resultId } = req.params;
    const {
      student,
      courseSession,
      semester,
      subjectWiseMarks,
      totalMarks,
      isPromoted,
    } = req.body;
    const result = await Result.findByIdAndUpdate(
      resultId,
      {
        $set: {
          student,
          courseSession,
          semester,
          subjectWiseMarks,
          totalMarks,
          isPromoted,
        },
      },
      { new: true }
    );

    if (!result) {
      throw new ApiError(404, "Result does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedResult: result },
          "Result fetched successfully"
        )
      );
  }
);

export const deleteResult = asyncHandler(
  async (req: Request, res: Response) => {
    const { resultId } = req.params;

    const result = await Result.findByIdAndDelete(resultId);

    if (!result) {
      throw new ApiError(404, "Result does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedResult: result },
          "Result deleted successfully"
        )
      );
  }
);
