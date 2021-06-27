import { Request, Response } from "express";
import { UserAuthenticateService } from "../services/UserAuthenticateService";

class UserAuthenticateController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const userAuthenticateService = new UserAuthenticateService();
    const token = await userAuthenticateService.execute({
      email, 
      password
    });

    return res.json(token);
  }
};

export { UserAuthenticateController };