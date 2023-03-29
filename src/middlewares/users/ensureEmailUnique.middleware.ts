import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors/appError";

const ensureEmailUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  if (req.body.email) {
    const exists = await clientRepository.findOneBy({
      email: req.body.email,
    });

    if (exists) {
      throw new AppError("Email Alredy in use!!", 409);
    }
  }

  return next();
};

export { ensureEmailUniqueMiddleware };
