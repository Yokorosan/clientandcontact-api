import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";

const deleteUserService = async (userId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  await clientRepository.delete(userId);

  return;
};

export { deleteUserService };
