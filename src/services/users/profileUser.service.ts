import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IUserCreateResponse } from "../../interfaces/users.interface";
import { clientResponse } from "../../schemas";

const profileUserService = async (
  userId: string
): Promise<IUserCreateResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({ id: userId });

  const validatedResponse = clientResponse.parse(client);

  return validatedResponse;
};

export { profileUserService };