import { QueryResult } from "pg";
import { z } from "zod";
import { login, clientCreate, clientEdit, clientResponse } from "../schemas";

type IUserCreate = z.infer<typeof clientCreate>;
type IUserCreateResponse = z.infer<typeof clientResponse>;
type IUserEdit = z.infer<typeof clientEdit>;

type IUserLogin = z.infer<typeof login>;

export { IUserCreate, IUserCreateResponse, IUserLogin, IUserEdit };
