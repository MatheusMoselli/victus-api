import { Request, Response } from "express";
import userService from "../services/UserService";

class UserController {
  async create(req: Request, res: Response) {
    const {
      email,
      password,
      name,
      CPF,
      birthday
    } = req.body;

    const user = await userService.create({ 
      email, 
      password,
      name,
      CPF,
      birthday
    });

    return res.json(user);
  }

  async get(req: Request, res: Response) {
    const id = req.id;

    const user = await userService.get(id);

    return res.json(user);
  }

  async authenticate(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const token = await userService.authenticate(
      email, 
      password
    );

    return res.json(token);
  }
};

export default new UserController();