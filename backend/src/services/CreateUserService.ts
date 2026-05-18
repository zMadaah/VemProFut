import bcrypt from "bcrypt";
import { prisma } from "../database/prisma";

interface IRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class CreateUserService {
  async execute({
    name,
    email,
    phone,
    password,
  }: IRequest) {

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      throw new Error("Email já cadastrado");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashPassword
      }
    });

    return user;
  }
}

export default new CreateUserService();