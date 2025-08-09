import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Subject } from "../models/subject.models";
import { ApiError } from "../utils/api-error";
import ApiResponse from "../utils/api-response";

export const createSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, title = "", descripiton = "" } = req.body;

    const subject = await Subject.findOne({ code: code });

    if (subject) {
      throw new ApiError(409, "Subject exist");
    }

    const newSubject = await Subject.create({
      code,
      title,
      descripiton,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { subject: newSubject },
          "Successfully created Subject"
        )
      );
  }
);
export const getSubject = asyncHandler(async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    throw new ApiError(404, "Invalid SubjectId");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, subject, "Successfully fetched subject"));
});
export const getAllSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const allSubjects = await Subject.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, allSubjects, "Successfully feteched all subject")
      );
  }
);
export const updateSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params;
    const { title, descripiton } = req.body;

    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $set: {
          title,
          descripiton,
        },
      },
      { new: true }
    );
    if (!subject) {
      throw new ApiError(404, "Invalid SubjectId");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, subject, "Updated successfully"));
  }
);
export const deleteSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params;
    const subject = await Subject.findByIdAndDelete(subjectId);
    if (!subject) {
      throw new ApiError(404, "Subject does not exist");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedSubject: subject },
          "Subject deleted successfully"
        )
      );
  }
);
