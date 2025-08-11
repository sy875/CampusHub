import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middleware/auth.middleware";
import {
  deleteAttendance,
  getAllAttendance,
  getAttendance,
  markAttendance,
  updateAttendance,
} from "../controllers/attendance.controllers";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";
import { UserRolesEnum } from "../utils/Constants";

const router = Router();

router.route("/").post(verifyJWT, markAttendance);
router
  .route("/:courseSessionId")
  .get(mongodIdPathVariableValidator("courseSessionId"), getAttendance);

router
  .route("/:attendanceId")
  .all(
    mongodIdPathVariableValidator("attendanceId"),
    verifyJWT,
    verifyPermission([UserRolesEnum.FACULTY, UserRolesEnum.ADMIN])
  )
  .patch(updateAttendance)
  .delete(deleteAttendance);

router
  .route("/admin/student-attendances")
  .get(
    verifyJWT,
    verifyPermission([UserRolesEnum.FACULTY, UserRolesEnum.ADMIN]),
    getAllAttendance
  );

export default router;
