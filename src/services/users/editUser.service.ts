import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
  IUserCreateResponse,
  IUserEdit,
} from "../../interfaces/users.interface";
import { clientResponse } from "../../schemas";

const editUserService = async (body: IUserEdit, id: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({
    id: id,
  });

  const newUser = clientRepository.create({ ...client, ...body });
  await clientRepository.save(newUser);

  const response = clientResponse.parse(newUser);

  return response;
};

export { editUserService };
