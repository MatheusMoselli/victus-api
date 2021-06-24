import { Request, Response } from "express";
import { ListCollectionPointsService } from "../services/ListCollectionPointsService";

class ListCollectionPointsController {
  async handle(req: Request, res: Response) {
    const listCollectionPointsService = new ListCollectionPointsService();
    const collectionPoints = await listCollectionPointsService.execute();

    return res.json(collectionPoints);
  }
};

export { ListCollectionPointsController };