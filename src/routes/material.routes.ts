import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterial,
  getMaterial,
  updateMaterial,
} from "../controllers/material.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";


const router = Router();

router
  .route("/")
  .post(verifyJWT, verifyPermission([UserRolesEnum.FACULTY,UserRolesEnum.ADMIN]), createMaterial)
  .get(getAllMaterial);

router
  .route("/:materialId")
  .all(mongodIdPathVariableValidator("materialId"))
  .get(getMaterial)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.FACULTY, UserRolesEnum.ADMIN]),
    updateMaterial
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.FACULTY]),
    deleteMaterial
  );

export default router;
