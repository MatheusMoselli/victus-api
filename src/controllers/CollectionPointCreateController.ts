import { Request, Response } from 'express';
import { CollectionPointCreateService } from '../services/CollectionPointCreateService';

class CollectionPointCreateController {
  async handle(req: Request, res: Response) {
    const {
      CNPJ,
      name,
      email,
      password,
      address
    } = req.body;

    const collectionPointCreateService = new CollectionPointCreateService();

    const collectionPoint = await collectionPointCreateService.execute({
      CNPJ,
      name,
      email,
      password,
      address
    });

    return res.json(collectionPoint);
  }
}

export { CollectionPointCreateController };