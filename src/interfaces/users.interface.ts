import { QueryResult } from "pg";
import { z } from "zod";
import {
  login,
  clientCreate,
  clientEdit,
  clientResponse,
  paginationResponse,
} from "../schemas";

type IUserCreate = z.infer<typeof clientCreate>;
type IUserCreateResponse = z.infer<typeof clientResponse>;
type IUserEdit = z.infer<typeof clientEdit>;

type IUserLogin = z.infer<typeof login>;

type IPaginationResponse = z.infer<typeof paginationResponse>;

export {
  IUserCreate,
  IUserCreateResponse,
  IUserLogin,
  IUserEdit,
  IPaginationResponse,
};
