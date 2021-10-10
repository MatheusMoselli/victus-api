import { Request, Response } from "express";
import userService from "../services/UserService";

class UserController {
  async create(req: Request, res: Response) {
    const { email, password, name, CPF, birthday } = req.body;

    const user = await userService.create({
      email,
      password,
      name,
      CPF,
      birthday,
    });

    return res.json(user);
  }

  async get(req: Request, res: Response) {
    const id = req.id;

    const user = await userService.get(id);

    return res.json(user);
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await userService.authenticate(email, password);

    return res.json(token);
  }

  async update(req: Request, res: Response) {
    const { name, birthday } = req.body;

    const id = req.id;

    const user = await userService.update({ name, birthday, id });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const id = req.id;

    await userService.delete(id);
    res.json({ message: "User deleted successfully" });
  }

  async buyTicket(req: Request, res: Response) {
    const { event_id } = req.body;
    const user_id = req.id;

    const ticket = await userService.buyTicket(event_id, user_id);

    return res.json(ticket);
  }

  async myEvents(req: Request, res: Response) {
    const id = req.id;
    const tickets = await userService.myEvents(id);

    return res.json(tickets);
  }

  async saveEvent(req: Request, res: Response) {
    const id = req.id;
    const { event_id } = req.body;

    const user = await userService.saveEvent(id, event_id);
    return res.json(user);
  }

  async getAllSavedEvents(req: Request, res: Response) {
    const id = req.id;
    const events = await userService.getAllSavedEvents(id);
    return res.json(events);
  }
}

export default new UserController();
