import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors/appError";

const ensureUserOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: req.params.id },
    relations: { user: true },
  });

  if (contact!.user.id != req.user.id) {
    throw new AppError("You don't have permission", 403);
  }

  return next();
};

export { ensureUserOwnerMiddleware };
