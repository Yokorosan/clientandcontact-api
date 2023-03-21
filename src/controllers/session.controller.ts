import { Request, Response } from "express";
import { createSessionService } from "../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const token = await createSessionService(req.body);
  return res.json({ token: token });
};

export { createSessionController };
