import { Request, Response } from "express";
import eventService from "../services/EventService";



class EventController {
  async listByCreator(req: Request, res: Response) {
    const creator = req.params.creator_id;
    const events = await eventService.listByCreator(creator);

    return res.json(events);
  }

  async listAll(req: Request, res: Response) {
    const events = await eventService.listAll();
    return res.json(events);
  };
};

export default new EventController();