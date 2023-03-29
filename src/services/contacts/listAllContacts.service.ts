import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IAllContact } from "../../interfaces/contact.interface";
import { manyContacts } from "../../schemas";

const listAllContactsService = async (): Promise<IAllContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contacts = contactRepository
    .createQueryBuilder("contact")
    .innerJoin("contact.user", "client")
    .where("client.id = :id");

  const parsedContacts = manyContacts.parse(contacts);

  return parsedContacts;
};

export { listAllContactsService };
