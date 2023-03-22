import { AppDataSource } from "../../data-source";
import { Client, Contact } from "../../entities";
import { IContactCreate } from "../../interfaces/contact.interface";
import { registerContact } from "../../schemas";

const createContactService = async (
  userId: string,
  body: IContactCreate
): Promise<IContactCreate> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: { id: userId },
    relations: { contacts: true },
  });
  console.log(client);

  const newContact = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    user: client!,
  };

  const contact = contactRepository.create(newContact);
  await contactRepository.save(contact);

  const parsedContact = registerContact.parse(contact);

  return parsedContact;
};

export { createContactService };
