import { getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";
import { CreateUserService } from "./CreateUserService";

interface IClientRequest {
  CPF: string;
  name: string;
  email: string;
  password: string;
  points: number;
  birthday: Date;
  premium?: boolean;
}

class CreateClientService {
  async execute({ CPF, name, email, password, points, birthday, premium = false }: IClientRequest) {
    const clientRepository = getCustomRepository(ClientRepository);
    const userService = new CreateUserService();

    const clientExists = await clientRepository.findOne({
      CPF
    });
    
    if (clientExists) {
      throw new Error("CPF already been used!");
    }
    
    const user = await userService.execute({
      name,
      email,
      password
    });
    

    const client = clientRepository.create({
      CPF,
      premium,
      birthday,
      points,
      user_id: user.id,
    })

    await clientRepository.save(client);

    return client;
  }
}

export { CreateClientService };