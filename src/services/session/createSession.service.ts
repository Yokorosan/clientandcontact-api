import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users.interface";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ email: email });

  if (!client) {
    throw new AppError("Email or password invalid", 403);
  }

  if (client.isActive == false) {
    throw new AppError("User is not active", 400);
  }

  const passwordMatch = await compare(password, client?.password!);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isAdm: client.isAdm,
      isActive: client.isActive,
    },
    process.env.SECRET_KEY!,
    {
      subject: client.id,
      expiresIn: "72h",
    }
  );

  return token;
};

export { createSessionService };
