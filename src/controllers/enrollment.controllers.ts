import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Course } from "../models/course.models";
import { User } from "../models/user.models";
import { ApiError } from "../utils/api-error";
import { CourseSession } from "../models/courseSession.models";
import { Enrollment } from "../models/enrollment.models";
import ApiResponse from "../utils/api-response";

export const createEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId, courseSessionId } = req.body;

    const studentExist = await User.findById(studentId);
    if (!studentExist) {
      throw new ApiError(404, "Student does not exist");
    }
    const courseSessionExist = await CourseSession.findById(courseSessionId);
    if (!courseSessionExist) {
      throw new ApiError(404, "Course session does not exist");
    }
    
    const enrollment = await Enrollment.create({
      student: studentExist._id,
      courseSession: courseSessionExist._id,
      createdBy: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, enrollment, "Enrollment successfull"));
  }
);

export const getAllEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const allEnrollment = await Enrollment.find({});
    return res
      .status(200)
      .json(
        new ApiResponse(200, allEnrollment, "Enrollments fetched successfull")
      );
  }
);
export const getEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const { enrollmentId } = req.params;
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      throw new ApiError(404, "Enrollment does not exist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, enrollment, "Enrollment fetched successfull"));
  }
);
export const deleteEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    const { enrollmentId } = req.params;
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!enrollment) {
      throw new ApiError(404, "Enrollment does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedEnrollment: enrollment },
          "Enrollment deleted successfull"
        )
      );
  }
);
