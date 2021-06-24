import { getCustomRepository } from "typeorm";
import { CollectionPointRepository } from "../repositories/CollectionPointRepository";


class ListCollectionPointsService {
  async execute() {
    const collectionPointRepository = getCustomRepository(CollectionPointRepository);
    const collectionPoints = await collectionPointRepository.find({ relations: ["user"] });

    return collectionPoints;
  }
};

export { ListCollectionPointsService };