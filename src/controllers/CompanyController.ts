import { Request, Response } from "express";
import companyService from "../services/CompanyService";

class CompanyController {
  async create(req: Request, res: Response) {
    const {
      CNPJ,
      name,
      email,
      password
    } = req.body;

    const company = await companyService.create({
      CNPJ,
      name,
      email,
      password
    });

    return res.json(company);
  }

  async authenticate(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const company = await companyService.authenticate(email, password);

    return res.json(company);
  }

  async get(req: Request, res: Response) {
    const id = req.id;
    const company = await companyService.get(id);

    return res.json(company);
  }

  async createEvent(req: Request, res: Response) {
    const {
      name,
      address,
      necessary_points,
      date,
      type
    } = req.body;

    const creator = req.id;

    const event = await companyService.createEvent({ name, address, necessary_points, date, creator, type });

    return res.json(event);
  }

  async myEvents(req: Request, res: Response) {
    const id = req.id;
    const events = await companyService.myEvents(id);

    return res.json(events);
  }

  async update(req: Request, res: Response) {
    const {
      name
    } = req.body;

    const id = req.id;

    const company = await companyService.update({ name, id });
    return res.json(company);
  }

  async delete(req: Request, res: Response){

    const id= req.id;
    await companyService.delete(id);
    res.json({ message: "Company deleted successfully" })
  }

};

export default new CompanyController();