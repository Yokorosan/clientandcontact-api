import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appError";

const ensureUserOwnerOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (req.params.id != req.user.id && req.user.isAdm != true) {
    throw new AppError("You don't have permission", 403);
  }

  return next();
};

export { ensureUserOwnerOrAdminMiddleware };
