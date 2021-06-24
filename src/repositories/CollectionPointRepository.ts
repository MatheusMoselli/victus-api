import { EntityRepository, Repository } from "typeorm";
import { CollectionPoint } from '../entities/CollectionPoint';


@EntityRepository(CollectionPoint)
class CollectionPointRepository extends Repository<CollectionPoint> {};

export { CollectionPointRepository };