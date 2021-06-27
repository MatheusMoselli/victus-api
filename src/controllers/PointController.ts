import { Request, Response } from "express";
import pointService from "../services/PointService";

class PointController {
  async create(req: Request, res: Response) {
    const {
      CNPJ,
      name,
      email,
      password,
      address
    } = req.body;

    const collectionPoint = await pointService.create({
      CNPJ,
      name,
      email,
      password,
      address
    });

    return res.json(collectionPoint);
  };

  async authenticate(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const token = await pointService.authenticate(
      email, 
      password
    );

    return res.json(token)
  };

  async get(req: Request, res: Response) {
    const id = req.id;
    
    const collectionPoint = await pointService.get(id);

    return res.json(collectionPoint);
  }
};

export default new PointController();