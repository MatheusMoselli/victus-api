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

  async transaction(req: Request, res: Response) {
    const {
      pounds,
      user_cpf,
    } = req.body;

    const id = req.id;

    const transaction = await pointService.transaction( pounds, user_cpf, id );

    return res.json(transaction);
  }

  async update(req: Request, res: Response) {
    const {
      name,
      address,
      profile_picture
    } = req.body;

    const id = req.id;

    const point = await pointService.update(id, name, address, profile_picture);

    return res.json(point);
  };
};

export default new PointController();