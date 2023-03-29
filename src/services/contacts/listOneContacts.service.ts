import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactCreate } from "../../interfaces/contact.interface";
import { registerContact } from "../../schemas";

const listOneContactService = async (
  contactId: string
): Promise<IContactCreate> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: contactId });
  const parsedContact = registerContact.parse(contact);

  return parsedContact;
};

export { listOneContactService };
