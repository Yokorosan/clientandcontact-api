import { Router } from "express";
import {
  createUserController,
  editUserController,
  softDeleteUserController,
  restoreUserController,
  profileUserController,
  listAllUsersController,
  listAnyOneController,
  deleteUserController,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/general/validateBody.middleware";
import { verifyUserIsActiveMiddleware } from "../middlewares/general/verifyUserIsActive.middleware";
import { verifyAuthMiddleware } from "../middlewares/session/verifyAuth.middleware";
import { ensureEmailUniqueMiddleware } from "../middlewares/users/ensureEmailUnique.middleware";
import { ensureIdIsValidMiddleware } from "../middlewares/users/ensureIdIsValid.middleware";
import { ensureUserIsActiveMiddleware } from "../middlewares/users/ensureUserIsActive.middleware";
import { ensureUserIsAdminMiddleware } from "../middlewares/users/ensureUserIsAdmin.middleware";
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
  ensureUserIsActiveMiddleware,
  ensureIdIsValidMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  ensureEmailUniqueMiddleware,
  validateBodyMiddleware(clientEdit),
  editUserController
);

usersRouter.delete(
  "/:id/deactivate",
  verifyAuthMiddleware,
  ensureUserIsActiveMiddleware,
  ensureIdIsValidMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  softDeleteUserController
);

usersRouter.delete(
  "/:id",
  verifyAuthMiddleware,
  ensureIdIsValidMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  deleteUserController
);

usersRouter.put(
  "/:id/restore",
  verifyAuthMiddleware,
  ensureIdIsValidMiddleware,
  verifyUserIsActiveMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  restoreUserController
);

usersRouter.get("", verifyAuthMiddleware, profileUserController);

usersRouter.get(
  "/all",
  verifyAuthMiddleware,
  ensureUserIsActiveMiddleware,
  ensureUserIsAdminMiddleware,
  listAllUsersController
);

usersRouter.get(
  "/:id",
  verifyAuthMiddleware,
  ensureUserIsActiveMiddleware,
  ensureIdIsValidMiddleware,
  ensureUserOwnerOrAdminMiddleware,
  listAnyOneController
);

export { usersRouter };
