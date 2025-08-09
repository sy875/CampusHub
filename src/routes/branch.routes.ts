import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import { AvailableUserRoles, UserRolesEnum } from "../utils/Constants";
import { crateBranch, deleteBranch, getAllBranch, getBranch, updateBranch } from "../controllers/branch.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router()

router.route("/")
.post(verifyJWT,verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.FACULTY]),crateBranch)
.get(getAllBranch)

router.route("/:branchId")
.all(mongodIdPathVariableValidator("branchId"))
.get(getBranch)
.patch(verifyJWT,verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.FACULTY]),updateBranch)
.delete(verifyJWT,verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.FACULTY]),deleteBranch)

export default router