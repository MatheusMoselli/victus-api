import { getCustomRepository } from "typeorm";
import { CollectionPointRepository } from "../repositories/CollectionPointRepository";
import { CreateUserService } from "./CreateUserService";


interface ICollectionRequest {
  name: string;
  email: string;
  password: string;
  CNPJ: string;
  location: string;
}

class CreateCollectionPointService {
  async execute({ name, email, password, CNPJ, location }: ICollectionRequest) {
    const collectionPointRepository = getCustomRepository(CollectionPointRepository);
    const createUserService = new CreateUserService();

    const collectionPointExists = await collectionPointRepository.findOne({
      CNPJ
    });

    if(collectionPointExists) {
      throw new Error("CNPJ already been used!");
    };

  const user = await createUserService.execute({
    name,
    email,
    password
  });

  const collectionPoint = collectionPointRepository.create({
    CNPJ,
    location,
    user_id: user.id
  });

  await collectionPointRepository.save(collectionPoint);

  return collectionPoint;
  }
}

export { CreateCollectionPointService };