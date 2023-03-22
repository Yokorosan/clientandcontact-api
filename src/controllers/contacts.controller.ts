import { Request, Response } from "express";
import { createContactService } from "../services/contacts/createContact.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";
import { listAllContactsService } from "../services/contacts/listAllContacts.service";
import { listOneContactService } from "../services/contacts/listOneContacts.service";
import { updateContactService } from "../services/contacts/updateContact.service";

const createNewContactController = async (req: Request, res: Response) => {
  const contact = await createContactService(req.user.id, req.body);
  return res.status(201).json(contact);
};

const updateContactController = async (req: Request, res: Response) => {
  const contact = await updateContactService(req.params.id, req.body);
  return res.status(200).json(contact);
};

const listOneContactController = async (req: Request, res: Response) => {
  const contact = await listOneContactService(req.params.id);
  return res.status(200).json(contact);
};

const listAllContactsController = async (req: Request, res: Response) => {
  const contacts = await listAllContactsService();
  return res.status(200).json(contacts);
};

const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.params.id);

  return res.status(204).send();
};

export {
  createNewContactController,
  updateContactController,
  listOneContactController,
  listAllContactsController,
  deleteContactController,
};
