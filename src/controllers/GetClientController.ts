import { Request, Response } from "express";
import { GetClientService } from "../services/GetClientService";
class GetClientController {
  async handle(req: Request, res: Response) {
    const id = req.id;

    const getClientService = new GetClientService();
    const clients = await getClientService.execute(id);
    
    return res.json(clients);
  }
}

export { GetClientController };