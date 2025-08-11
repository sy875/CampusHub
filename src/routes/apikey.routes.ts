import { Router } from "express";
import {
  createApiKey,
  deleteApiKey,
  getApiKeys,
  updateApiKey,
} from "../controllers/apikey.controllers";
import { verifyJWT} from "../middleware/auth.middleware";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router.route("/").get(verifyJWT,getApiKeys).post(verifyJWT, createApiKey);

router
  .route("/:apikeyId")
  .all(mongodIdPathVariableValidator("apikeyId"))
  .patch(verifyJWT, updateApiKey)
  .delete(verifyJWT, deleteApiKey);

export default router;
