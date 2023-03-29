import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
  IUserCreate,
  IUserCreateResponse,
} from "../../interfaces/users.interface";
import { clientResponse } from "../../schemas";

const createUserService = async (
  body: IUserCreate
): Promise<IUserCreateResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client: Client = clientRepository.create(body);
  await clientRepository.save(client);

  const validatedResponse = clientResponse.parse(client);

  return validatedResponse;
};

export { createUserService };
