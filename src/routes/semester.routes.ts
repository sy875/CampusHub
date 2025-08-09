import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  createSemester,
  deleteSemester,
  getAllSemester,
  getSemester,
  updateSemester,
} from "../controllers/semester.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    createSemester
  )
  .get(getAllSemester);

router
  .route("/:semesterId")
  .all(mongodIdPathVariableValidator("semesterId"))
  .get(getSemester)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    updateSemester
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteSemester
  );

export default router;
