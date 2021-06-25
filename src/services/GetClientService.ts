import { getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";
import { classToPlain } from "class-transformer";
class GetClientService {
  async execute(id: string) {
    const clientRepository = getCustomRepository(ClientRepository);

    const client = await clientRepository.find({
      where: { id },
      relations: ["user"]
    });

    return classToPlain(client);
  }
}

export { GetClientService };