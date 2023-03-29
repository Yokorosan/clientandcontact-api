import { z } from "zod";
import { clientCreate } from "./client.schema";

const registerContact = z.object({
  id: z.string(),
  name: z.string().max(75),
  email: z.string().max(100),
  phone: z.string().max(15),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

const editContact = registerContact
  .extend({
    name: z.string().max(75).optional(),
    email: z.string().max(100).optional(),
    phone: z.string().max(15).optional(),
  })
  .omit({ id: true, createdAt: true, updatedAt: true });

const manyContacts = z.array(registerContact);

const registerWithUser = registerContact.extend({ user: clientCreate });

export { registerContact, registerWithUser, editContact, manyContacts };
