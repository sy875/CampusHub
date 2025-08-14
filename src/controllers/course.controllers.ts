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

    const duplicateCode = code.trim().toLowerCase();

    const courseExist = await Course.findOne({ code: duplicateCode });
    if (courseExist) {
      throw new ApiError(409, `Course already exist with ${duplicateCode}`);
    }
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
    // const allCourse = await Course.find({});
    const allCourses = await Course.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: "branches",
          localField: "branch",
          foreignField: "_id",
          as: "branch",
          pipeline: [
            {
              $project: {
                title: 1,
                _id: 0,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "semesters",
          localField: "semesters",
          foreignField: "_id",
          as: "semesters",
          pipeline: [
            {
              $lookup: {
                from: "subjects",
                localField: "subjects",
                foreignField: "_id",
                as: "subjects",
                pipeline: [
                  {
                    $project: {
                      code: 1,
                      title: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                semesterCode: 1,
                semesterNumber: 1,
                duration: 1,
                subjects: 1,
              },
            },
          ],
        },
      },

      {
        $addFields: {
          branch: { $first: "$branch" },
        },
      },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(200, allCourses, "All Course fetched successfully")
      );
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
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          title,
          description,
        },
      },
      { new: true }
    );
    if (!course) {
      throw new ApiError(404, "Course does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedCourse: course },
          "Course updated successfully"
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
          "Course deleted successfully"
        )
      );
  }
);
