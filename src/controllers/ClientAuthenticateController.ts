import { Request, Response } from "express";
import { ClientAuthenticateService } from "../services/ClientAuthenticateService";

class ClientAuthenticateController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const clientAuthenticateService = new ClientAuthenticateService();
    const token = await clientAuthenticateService.execute({ email, password });

    return res.json(token);
  };
};

export { ClientAuthenticateController };