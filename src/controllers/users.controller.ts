import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { editUserService } from "../services/users/editUser.service";
import { listAllUsersService } from "../services/users/listAllUser.service";
import { listAnyOneUserService } from "../services/users/listAnyOneUser.service";
import { profileUserService } from "../services/users/profileUser.service";
import { restoreUserService } from "../services/users/restoreUser.service";
import { softDeleteUserService } from "../services/users/softDeleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  const createUser = await createUserService(req.body);
  return res.status(201).json(createUser);
};

const editUserController = async (req: Request, res: Response) => {
  const editUser = await editUserService(req.body, req.params.id);
  return res.json(editUser);
};

const profileUserController = async (req: Request, res: Response) => {
  const profile = await profileUserService(req.user.id);
  return res.status(200).json(profile);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService(req.query);
  return res.status(200).json(users);
};

const listAnyOneController = async (req: Request, res: Response) => {
  const user = await listAnyOneUserService(req.params.id);
  return res.status(200).json(user);
};

const softDeleteUserController = async (req: Request, res: Response) => {
  await softDeleteUserService(req.params.id);
  return res.status(204).send();
};

const restoreUserController = async (req: Request, res: Response) => {
  const restoredUser = await restoreUserService(req.params.id);
  return res.status(200).json(restoredUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id);
  return res.status(204).send();
};

export {
  createUserController,
  editUserController,
  softDeleteUserController,
  restoreUserController,
  profileUserController,
  listAllUsersController,
  listAnyOneController,
  deleteUserController,
};
