import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors/appError";

const verifyUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id: req.user.id },
    withDeleted: true,
  });

  if (client?.isActive == true) {
    throw new AppError("User is alredy active", 400);
  }
  return next();
};

export { verifyUserIsActiveMiddleware };
