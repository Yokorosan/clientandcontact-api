import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors/appError";

const ensureIdIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({
    id: req.params.id,
  });

  if (!client) {
    throw new AppError("User don't Exists", 404);
  }

  return next();
};

export { ensureIdIsValidMiddleware };
