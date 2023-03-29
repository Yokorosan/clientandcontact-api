import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";

const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(`${error.message}`, 401);
    }
    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive,
    };
    return next();
  });
};

export { verifyAuthMiddleware };
