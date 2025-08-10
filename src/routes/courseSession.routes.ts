import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  getCourseSession,
  createCourseSession,
  getAllCourseSession,
  updateCourseSession,
  deleteCourseSession,
} from "../controllers/courseSession.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    createCourseSession
  )
  .get(getAllCourseSession);

router
  .route("/:courseSessionId")
  .all(mongodIdPathVariableValidator("courseSessionId"))
  .get(getCourseSession)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    updateCourseSession
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteCourseSession
  );

export default router;
