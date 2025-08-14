import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Announcement } from "../models/announcement.models";
import ApiResponse from "../utils/api-response";
import { ApiError } from "../utils/api-error";

export const createAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, description, effectiveFrom, effectiveTo } = req.body;

    const announcement = await Announcement.create({
      title,
      description,
      effectiveFrom,
      effectiveTo,
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, announcement, "Announcement created successfully")
      );
  }
);

export const getAllAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const allAnnouncement = await Announcement.find({}).populate({
      path:"createdBy",
      select:"-_id username"
    })

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allAnnouncement,
          "All announcement fetched successfully"
        )
      );
  }
);

export const getAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    const announcement = await Announcement.findById(announcementId)

    if (!announcement) {
      throw new ApiError(404, "Announcement does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, announcement, "Announcement fetched successfully")
      );
  }
);

export const updateAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    const { title, description, effectiveFrom, effectiveTo } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      announcementId,
      {
        $set: { title, description, effectiveFrom, effectiveTo },
      },
      { new: true }
    );

    if (!announcement) {
      throw new ApiError(404, "Announcement does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedAnnouncement: announcement },
          "Announcement updated successfully"
        )
      );
  }
);
export const deleteAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const { announcementId } = req.params;

    const announcement = await Announcement.findByIdAndDelete(announcementId);

    if (!announcement) {
      throw new ApiError(404, "Announcement does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedAnnouncement: announcement },
          "Announcement deleted successfully"
        )
      );
  }
);
