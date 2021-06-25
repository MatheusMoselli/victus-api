import { Request, Response } from "express";
import { CollectionPointAuthenticateService } from "../services/CollectionPointAuthenticateService";

class CollectionPointAuthenticateController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const collectionPointAuthenticateService = new CollectionPointAuthenticateService();
    const token = await collectionPointAuthenticateService.execute({
      email, 
      password
    });

    return res.json(token);
  }
};

export { CollectionPointAuthenticateController };