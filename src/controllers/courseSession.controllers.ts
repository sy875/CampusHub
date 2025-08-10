import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Course } from "../models/course.models";
import { ApiError } from "../utils/api-error";
import { User } from "../models/user.models";
import { CourseSession } from "../models/courseSession.models";
import ApiResponse from "../utils/api-response";

export const createCourseSession = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      course,
      startDate,
      endDate,
      isEnrollmentOpen,
      instructors,
      description,
    } = req.body;

    const courseExist = await Course.findById(course);
    if (!courseExist) {
      throw new ApiError(404, "Course does not exist");
    }
    const instructorsExist = await User.find({ _id: { $in: instructors } });
    if (instructorsExist.length !== instructors.length) {
      throw new ApiError(400, "one or more instructors does not exist");
    }

    const newCourseSession = await CourseSession.create({
      course,
      startDate,
      endDate,
      isEnrollmentOpen,
      instructors,
      description,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { courseSession: newCourseSession },
          "Course Session created successfully"
        )
      );
  }
);

export const getAllCourseSession = asyncHandler(
  async (req: Request, res: Response) => {
    const courseSessions = await CourseSession.find({});
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { allCourseSessions: courseSessions },
          "All Course Session fetched successfully"
        )
      );
  }
);
export const getCourseSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSessionId } = req.params;
    const courseSession = await CourseSession.findById(courseSessionId);
    if (!courseSession) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          courseSession,
          "Course Session fetched successfully"
        )
      );
  }
);
export const updateCourseSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSessionId } = req.params;
    const { startDate, endDate, isEnrollmentOpen, instructors, description } =
      req.body;

    const courseSession = await CourseSession.findByIdAndUpdate(
      courseSessionId,
      {
        $set: {
          startDate,
          endDate,
          isEnrollmentOpen,
          instructors,
          description,
        },
      },
      { new: true }
    );
    if (!courseSession) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          courseSession,
          "Course Session updated successfully"
        )
      );
  }
);
export const deleteCourseSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSessionId } = req.params;

    const courseSession = await CourseSession.findByIdAndDelete(
      courseSessionId
    );
    if (!courseSession) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          courseSession,
          "Course Session deleted successfully"
        )
      );
  }
);
