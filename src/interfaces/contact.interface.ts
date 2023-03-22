import { z } from "zod";
import { registerContact, editContact, manyContacts } from "../schemas";

type IContactCreate = z.infer<typeof registerContact>;
type IContactEdit = z.infer<typeof editContact>;
type IAllContact = z.infer<typeof manyContacts>;
export { IContactCreate, IContactEdit, IAllContact };
