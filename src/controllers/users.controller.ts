import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { editUserService } from "../services/users/editUser.service";

const createUserController = async (req: Request, res: Response) => {
  const createUser = await createUserService(req.body);
  return res.status(201).json(createUser);
};

const editUserController = async (req: Request, res: Response) => {
  const editUser = await editUserService(req.body, req.params.id);
  return res.json(editUser);
};

export { createUserController, editUserController };
