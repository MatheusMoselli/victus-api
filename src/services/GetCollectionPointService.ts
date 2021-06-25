import { getCustomRepository } from "typeorm";
import { CollectionPointRepository } from "../repositories/CollectionPointRepository";
import { classToPlain } from 'class-transformer';


class GetCollectionPointService {
  async execute(id: string) {
    const collectionPointRepository = getCustomRepository(CollectionPointRepository);

    const collectionPoint = await collectionPointRepository.find({
      where: { id },
      relations: ["user"]
    });

    return classToPlain(collectionPoint);
  };
};

export { GetCollectionPointService };