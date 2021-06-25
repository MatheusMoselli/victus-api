import { Request, Response } from "express";
import { GetCollectionPointService } from "../services/GetCollectionPointService";

class GetCollectionPointController {
  async handle(req: Request, res: Response) {
    const id = req.id;
    
    const getCollectionPointService = new GetCollectionPointService();
    const collectionPoint = await getCollectionPointService.execute(id);

    return res.json(collectionPoint);
  }
};

export { GetCollectionPointController };