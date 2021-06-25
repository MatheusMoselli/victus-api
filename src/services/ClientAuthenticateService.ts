import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ClientRepository } from "../repositories/ClientRepository";

interface IClientRequest {
  email: string;
  password: string;
}

class ClientAuthenticateService {
  async execute({email, password}: IClientRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const clientRepository = getCustomRepository(ClientRepository);
    const user = await userRepository.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect!");
    };
    
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const client = await clientRepository.findOne({
      user_id: user.id
    });

    const token = sign({
      email: user.email
    }, process.env.JWT_SECRET_CLIENT, {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  };
};

export { ClientAuthenticateService };