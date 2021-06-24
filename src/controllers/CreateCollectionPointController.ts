import { Request, Response } from 'express';
import { CreateCollectionPointService } from '../services/CreateCollectionPointService';

class CollectionPointController {
  async handle(req: Request, res: Response) {
    const {
      CNPJ,
      location,
      name,
      email,
      password
    } = req.body;

    const createCollectionPointService = new CreateCollectionPointService();

    const collectionPoint = await createCollectionPointService.execute({
      CNPJ,
      location,
      name,
      email,
      password
    });

    return res.json(collectionPoint);
  }
}

export { CollectionPointController };