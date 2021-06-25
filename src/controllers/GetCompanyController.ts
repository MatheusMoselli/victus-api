import { Request, Response } from "express";
import { GetCompanyService } from "../services/GetCompanyService";

class GetCompanyController {
  async handle(req: Request, res: Response) {
    const id = req.id;

    const listCompaniesService = new GetCompanyService();
    const company = await listCompaniesService.execute(id);

    return res.json(company);
  }
};

export { GetCompanyController };