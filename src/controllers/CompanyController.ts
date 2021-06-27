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
};

export default new CompanyController();