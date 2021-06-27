import { Request, Response } from "express";
import { CollectionPointGetService } from "../services/CollectionPointGetService";

class CollectionPointGetController {
  async handle(req: Request, res: Response) {
    const id = req.id;
    
    const getCollectionPointService = new CollectionPointGetService();
    const collectionPoint = await getCollectionPointService.execute(id);

    return res.json(collectionPoint);
  }
};

export { CollectionPointGetController };