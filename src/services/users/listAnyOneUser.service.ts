import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { clientResponse } from "../../schemas";

const listAnyOneUserService = async (userId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({
    where: { id: userId },
    withDeleted: true,
  });

  const validatedResponse = clientResponse.parse(client);

  return validatedResponse;
};

export { listAnyOneUserService };
