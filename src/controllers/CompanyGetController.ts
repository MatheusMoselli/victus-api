import { Request, Response } from "express";
import { CompanyGetService } from "../services/CompanyGetService";

class CompanyGetController {
  async handle(req: Request, res: Response) {
    const id = req.id;

    const companyGetService = new CompanyGetService();
    const company = await companyGetService.execute(id);

    return res.json(company);
  }
};

export { CompanyGetController };