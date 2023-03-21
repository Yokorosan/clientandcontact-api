import { z } from "zod";
import { registerContact } from "./contact.schema";

const client = z.object({
  id: z.string(),
  name: z.string().max(75),
  email: z.string().max(100),
  password: z.string(),
  phone: z.string().max(15),
  isAdm: z.boolean().optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  contacts: z.array(registerContact).nullable().optional(),
});

const clientEdit = client
  .omit({
    id: true,
    isAdm: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    contacts: true,
  })
  .extend({
    name: z.string().max(75).optional(),
    email: z.string().max(100).optional(),
    password: z.string().optional(),
    phone: z.string().max(15).optional(),
  });

const clientCreate = client.omit({
  id: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  contacts: true,
});

const clientResponse = client.omit({ password: true });

const manyClientResponse = z.array(clientResponse);

export { client, clientCreate, clientResponse, clientEdit, manyClientResponse };
