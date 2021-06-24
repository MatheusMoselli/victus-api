import { getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";


class ListClientsService {
  async execute() {
    const clientRepository = getCustomRepository(ClientRepository);
    const clients = await clientRepository.find({ relations: ["user"]});

    return clients;
  }
}

export { ListClientsService };