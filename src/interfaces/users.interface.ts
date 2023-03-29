import { QueryResult } from "pg";
import { z } from "zod";
import {
  login,
  clientCreate,
  clientEdit,
  clientResponse,
  paginationResponse,
  manyClientResponse,
} from "../schemas";

type IUserCreate = z.infer<typeof clientCreate>;
type IUserCreateResponse = z.infer<typeof clientResponse>;
type IUserEdit = z.infer<typeof clientEdit>;

type IUserLogin = z.infer<typeof login>;
type IManyUserResponse = z.infer<typeof manyClientResponse>;
type IPaginationResponse = z.infer<typeof paginationResponse>;

export {
  IUserCreate,
  IUserCreateResponse,
  IUserLogin,
  IUserEdit,
  IPaginationResponse,
  IManyUserResponse,
};
