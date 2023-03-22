import { Router } from "express";
import {
  createNewContactController,
  deleteContactController,
  listAllContactsController,
  listOneContactController,
  updateContactController,
} from "../controllers/contacts.controller";
import { ensureContactIdIsValidMiddleware } from "../middlewares/contacts/ensureContactIdIsValid.middleware";
import { ensureUserOwnerMiddleware } from "../middlewares/contacts/ensureUserIsOwner.middleware";
import { validateBodyMiddleware } from "../middlewares/general/validateBody.middleware";
import { verifyAuthMiddleware } from "../middlewares/session/verifyAuth.middleware";
import { editContact } from "../schemas/contact.schema";

const contactsRouter = Router();

contactsRouter.post("", verifyAuthMiddleware, createNewContactController);

contactsRouter.patch(
  "/:id",
  verifyAuthMiddleware,
  ensureContactIdIsValidMiddleware,
  ensureUserOwnerMiddleware,
  validateBodyMiddleware(editContact),
  updateContactController
);

contactsRouter.get(
  "/:id",
  verifyAuthMiddleware,
  ensureContactIdIsValidMiddleware,
  ensureUserOwnerMiddleware,
  listOneContactController
);

contactsRouter.get(
  "/profile",
  verifyAuthMiddleware,
  ensureUserOwnerMiddleware,
  listAllContactsController
);

contactsRouter.delete(
  "/:id",
  verifyAuthMiddleware,
  ensureContactIdIsValidMiddleware,
  ensureUserOwnerMiddleware,
  deleteContactController
);

export { contactsRouter };
