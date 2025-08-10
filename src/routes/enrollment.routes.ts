import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollment,
  getEnrollment,
} from "../controllers/enrollment.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    createEnrollment
  )
  .get(getAllEnrollment);

router
  .route("/:enrollmentId")
  .all(mongodIdPathVariableValidator("enrollmentId"))
  .get(getEnrollment)
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteEnrollment
  );

export default router;
