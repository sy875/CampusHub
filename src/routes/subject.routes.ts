import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubject,
  updateSubject,
} from "../controllers/subject.controllers";
import { UserRolesEnum } from "../utils/Constants";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    createSubject
  )
  .get(getAllSubject);

router
  .route("/:subjectId")
  .all(mongodIdPathVariableValidator("subjectId"))
  .get(getSubject)
  .patch(updateSubject)
  .delete(deleteSubject);

export default router;
