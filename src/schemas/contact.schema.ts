import { z } from "zod";

const register = z.object({
  id: z.string(),
  name: z.string().max(75),
  email: z.string().max(100),
  password: z.string(),
  phone: z.string().max(15),
  isAdm: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

const registerCreate = register.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const registerResponse = register.omit({ password: true });

export { register, registerCreate, registerResponse };
