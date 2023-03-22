import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors/appError";

const ensureContactIdIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOne({
    where: { id: req.params.id },
  });

  if (!contact) {
    throw new AppError("Contact don't Exists", 404);
  }

  return next();
};

export { ensureContactIdIsValidMiddleware };
