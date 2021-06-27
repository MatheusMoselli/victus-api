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
  
  async listByType(req: Request, res: Response) {
    const type_name = req.params.event_type;
    const events = await eventService.listByType(type_name);

    return res.json(events);
  }

  async createTypes(req: Request, res: Response) {
    const { name } = req.body;
    const type = await eventService.createTypes(name);
    return res.json(type);
  };

};

export default new EventController();