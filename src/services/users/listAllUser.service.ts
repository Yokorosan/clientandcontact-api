import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
  IManyUserResponse,
  IPaginationResponse,
} from "../../interfaces/users.interface";
import { client, manyClientResponse } from "../../schemas";

const listAllUsersService = async (query: any): Promise<IManyUserResponse> => {
  // let page = !query.page || query.page <= 0 ? 0 : query.page - 1;
  // const perPage = !query.perPage || query.perPage > 2 ? 2 : query.perPage;
  // const order = !query.order ? "ASC" : query.order;
  // const sort = !query.sort
  //   ? "name"
  //   : query.sort.toLowerCase() == "date"
  //   ? "createdAt"
  //   : "name";

  // page = page * perPage;

  const clientRepository = AppDataSource.getRepository(Client);

  // const clients = await clientRepository.find({
  //   skip: page,
  //   take: perPage,
  //   order: {
  //     [sort]: order,
  //   },
  // });

  // const count = await clientRepository.count();
  // const maxPages = Math.ceil(count / perPage);

  // let prevPage:
  //   | string
  //   | null = `http://localhost:3000/users/all?perPage=${perPage}&page=${
  //   page - 1
  // }`;
  // if (page == 0 || page > maxPages + 1) {
  //   prevPage = null;
  // }
  // let nextPage:
  //   | string
  //   | null = `http://localhost:3000/users/all?perPage=${perPage}&page=${
  //   page + 1
  // }`;
  // if (page >= maxPages) {
  //   nextPage = null;
  // }
  const clients = await clientRepository.find({
    withDeleted: true,
  });

  const validatedClients = manyClientResponse.parse(clients);

  // const pagination = {
  //   prevPage: prevPage,
  //   nextPage: nextPage,
  //   count: count,
  //   data: validatedClients,
  // };

  return validatedClients;
};

export { listAllUsersService };
