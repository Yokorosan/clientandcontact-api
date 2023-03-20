import { Router } from "express";
import {
  createUserController,
  editUserController,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/general/validateBody.middleware";
import { verifyAuthMiddleware } from "../middlewares/general/verifyAuth.middleware";
import { ensureEmailUniqueMiddleware } from "../middlewares/users/ensureEmailUnique.middleware";
import { ensureIdIsValidMiddleware } from "../middlewares/users/ensureIdIsValid.middleware";
import { ensureUserOwnerOrAdminMiddleware } from "../middlewares/users/ensureUserOwnerOrAdmin.middleware";
import { clientCreate, clientEdit } from "../schemas";

const usersRouter = Router();

usersRouter.post(
  "/register/",
  validateBodyMiddleware(clientCreate),
  ensureEmailUniqueMiddleware,
  createUserController
);
usersRouter.patch(
  "/:id",
  verifyAuthMiddleware,
  ensureIdIsValidMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  ensureEmailUniqueMiddleware,
  validateBodyMiddleware(clientEdit),
  editUserController
);

export { usersRouter };
