import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import { Attendance } from "../models/attendance.models";
import ApiResponse from "../utils/api-response";

export const markAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSession, status } = req.body;

    const courseSessionExist = await courseSession.findById(courseSession);

    if (!courseSessionExist) {
      throw new ApiError(404, "Course session does not exist");
    }

    const attendanceExist = await Attendance.findOne({
      courseSession,
      student: req.user._id,
      markedAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (attendanceExist) {
      throw new ApiError(409, "Attendance marked already");
    }

    const attendance = await Attendance.create({
      courseSession,
      student: req.user._id,
      status,
      markedAt: Date.now(),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { markedAttendance: attendance },
          "Attendance marked successfully"
        )
      );
  }
);

export const getAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSessionId } = req.params;

    const attendance = await Attendance.find({
      courseSession: courseSessionId,
      student: req.user._id,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, attendance, "Attendance fetched successfully")
      );
  }
);
export const getAllAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseSessionId, studentId } = req.query;

    const attendance = await Attendance.find({
      courseSession: courseSessionId,
      student: studentId,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, attendance, "Attendance fetched successfully")
      );
  }
);

export const updateAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { attendanceId } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      {
        $set: { status },
      },
      { new: true }
    );

    if (!attendance) {
      throw new ApiError(404, "Attendance does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedAttendance: attendance },
          "Attendance fetched successfully"
        )
      );
  }
);

export const deleteAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { attendanceId } = req.params;
    const { status } = req.body;

    const attendance = await Attendance.findByIdAndDelete(attendanceId);

    if (!attendance) {
      throw new ApiError(404, "Attendance does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedAttendance: attendance },
          "Attendance fetched successfully"
        )
      );
  }
);
