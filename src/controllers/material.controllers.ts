import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { CourseSession } from "../models/courseSession.models";
import { ApiError } from "../utils/api-error";
import ApiResponse from "../utils/api-response";
import { Material } from "../models/material.models";
import { Course } from "../models/course.models";

export const createMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { title, courseSession, materialType, materialUrl, availableTo } =
      req.body;

    if (courseId) {
      const courseExist = await CourseSession.findById(courseId);
      if (!courseExist) {
        throw new ApiError(404, "Course  does not exist");
      }
    }

    if (courseSession) {
      const courseSessionExist = await CourseSession.findById(courseSession);

      if (!courseSessionExist) {
        throw new ApiError(404, "Course session does not exist");
      }
    }
    const material = await Material.create({
      title,
      course: courseId,
      courseSession,
      materialType,
      materialUrl,
      availableTo,
      uploadedBy: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, material, "Material created successfully"));
  }
);

export const getAllMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const allMaterial = await Material.find({});
    return res
      .status(200)
      .json(
        new ApiResponse(200, allMaterial, "All material fetched successfully")
      );
  }
);

export const getMaterialByCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, "Course does not exist");
    }

    const materials = await Material.find({ course: courseId });

    return res
      .status(200)
      .json(new ApiResponse(200, materials, "Materials fetched successfully"));
  }
);

export const getMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { materialId } = req.params;
  const material = await Material.findById(materialId);
  if (!material) {
    throw new ApiError(404, "Material does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, material, "Material fetched successfully"));
});

export const updateMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const { materialId } = req.params;
    const { title, courseSession, materialType, materialUrl, availableTo } =
      req.body;
    const material = await Material.findByIdAndUpdate(
      materialId,
      {
        $set: {
          title,
          courseSession,
          materialType,
          materialUrl,
          availableTo,
        },
      },
      { new: true }
    );
    if (!material) {
      throw new ApiError(404, "Material does not exist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, material, "Material updated successfully"));
  }
);

export const deleteMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const { materialId } = req.params;

    const material = await Material.findByIdAndDelete(materialId);
    if (!material) {
      throw new ApiError(404, "Material does not exist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, material, "Material deleted successfully"));
  }
);
