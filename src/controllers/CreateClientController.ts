import { Request, Response } from "express";
import { CreateClientService } from "../services/CreateClientService";

class CreateClientController {
  async handle(req: Request, res: Response) {
    const {
      premium,
      birthday,
      points,
      CPF,
      name, 
      email, 
      password
    } = req.body;

    const createClientService = new CreateClientService();

    const client = await createClientService.execute({
      premium,
      birthday,
      points,
      CPF,
      name, 
      email, 
      password
    });

    return res.json(client);
  }
};

export { CreateClientController };