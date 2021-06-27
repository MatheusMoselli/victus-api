import { Request, Response } from "express";
import { UserCreateService } from "../services/UserCreateService";

class UserCreateController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password,
      name,
      CPF,
      birthday
    } = req.body;

    const clientAuthenticateService = new UserCreateService();
    const user = await clientAuthenticateService.execute({ 
      email, 
      password,
      name,
      CPF,
      birthday
    });

    return res.json(user);
  };
};

export { UserCreateController };