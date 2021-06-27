import { Request, Response } from "express";
import { CompanyCreateService } from "../services/CompanyCreateService";

class CompanyCreateController {
  async handle(req: Request, res: Response) {
    const {
      CNPJ,
      name,
      email,
      password
    } = req.body;

    const companyCreateService = new CompanyCreateService();

    const company = await companyCreateService.execute({
      CNPJ,
      name,
      email,
      password
    });

    return res.json(company);
  };
}

export { CompanyCreateController };