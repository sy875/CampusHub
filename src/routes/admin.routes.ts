import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { UserRolesEnum } from "../utils/Constants";
import { assignRole, getAllUsers } from "../controllers/user.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";
import { userAssignRoleValidator } from "../validators/auth.validators";
import { validate } from "../validators/validate";

const router = Router();

router.use(verifyJWT, verifyPermission([UserRolesEnum.ADMIN]));

router.route("/users").get(getAllUsers);
router
  .route("/users/:id/role")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongodIdPathVariableValidator("id"),
    userAssignRoleValidator(),
    validate,
    assignRole
  );

export default router;
