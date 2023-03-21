import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IUserCreateResponse } from "../../interfaces/users.interface";
import { clientResponse } from "../../schemas";

const restoreUserService = async (
  userId: string
): Promise<IUserCreateResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  await clientRepository.restore(userId);

  const client = await clientRepository.findOne({
    where: { id: userId },
    withDeleted: true,
  });

  const activeClient = clientRepository.create({ ...client, isActive: true });
  await clientRepository.save(activeClient);

  const validatedResponse = clientResponse.parse(activeClient);

  return validatedResponse;
};

export { restoreUserService };
