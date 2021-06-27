import { Request, Response } from "express";
import { UserGetService } from "../services/UserGetService";

class UserGetController {
  async handle(req: Request, res: Response) {
    const id = req.id;

    const userGetService = new UserGetService();
    const user = await userGetService.execute(id);

    return res.json(user);
  }
}

export { UserGetController };