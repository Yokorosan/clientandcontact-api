import { Router } from "express";
import { createSessionController } from "../controllers/session.controller";
import { validateBodyMiddleware } from "../middlewares/general/validateBody.middleware";
import { login } from "../schemas";

const sessionRouter = Router();

sessionRouter.post("", validateBodyMiddleware(login), createSessionController);

export { sessionRouter };
