import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import {
  IContactCreate,
  IContactEdit,
} from "../../interfaces/contact.interface";
import { registerContact } from "../../schemas";

const updateContactService = async (
  contactId: string,
  body: IContactEdit
): Promise<IContactCreate> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOneBy({ id: contactId });

  const newContact = contactRepository.create({ ...contact, ...body });
  await contactRepository.save(newContact);

  const parsedContact = registerContact.parse(newContact);

  return parsedContact;
};

export { updateContactService };
