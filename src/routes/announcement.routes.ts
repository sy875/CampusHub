import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcement.controllers";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    createAnnouncement
  )
  .get(getAllAnnouncement);

router
  .route("/:announcementId")
  .get(getAnnouncement)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    updateAnnouncement
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteAnnouncement
  );

export default router;
