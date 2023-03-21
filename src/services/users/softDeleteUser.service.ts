import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";

const softDeleteUserService = async (userId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({ id: userId });

  const activeClient = clientRepository.create({ ...client, isActive: false });
  await clientRepository.save(activeClient);
  await clientRepository.softRemove(activeClient);
  return;
};

export { softDeleteUserService };
