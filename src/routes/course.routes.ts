import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourse,
  updateCourse,
} from "../controllers/course.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";
import {
  createMaterial,
  getMaterial,
  getMaterialByCourse,
} from "../controllers/material.controllers";

const router = Router();

router
  .route("/")
  .post(verifyJWT, verifyPermission([UserRolesEnum.ADMIN]), createCourse)
  .get(getAllCourse);

router
  .route("/:courseId/materials")
  .get(
    mongodIdPathVariableValidator("courseId"),
    verifyPermission([UserRolesEnum.FACULTY, UserRolesEnum.STUDENT]),
    getMaterialByCourse
  )
  .post(
    mongodIdPathVariableValidator("courseId"),
    verifyPermission([UserRolesEnum.FACULTY]),
    createMaterial
  );

router
  .route("/:courseId")
  .all(mongodIdPathVariableValidator("courseId"))
  .get(getCourse)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    updateCourse
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteCourse
  );

export default router;
