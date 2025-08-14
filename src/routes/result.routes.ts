import { Router } from "express";
import {
  createResult,
  deleteResult,
  getAllResult,
  getResult,
  getResultByStudentId,
  updateResult,
} from "../controllers/result.controllers";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router
  .route("/")
  .all(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY])
  )
  .get(getAllResult)
  .post(createResult);

router.route("/:studentId").get(getResultByStudentId);

router
  .route("/:resultId")
  .all(mongodIdPathVariableValidator("resultId"))
  .get(getResult)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    updateResult
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteResult
  );

export default router;
