import { Request, Response } from "express";
import { CompanyAuthenticateService } from "../services/CompanyAuthenticateService";

class CompanyAuthenticateController {
  async handle(req: Request, res: Response) {
    const {
      email,
      password
    } = req.body;

    const companyAuthenticateService = new CompanyAuthenticateService();
    const company = await companyAuthenticateService.execute({ email, password });

    return res.json(company);
  }
};

export { CompanyAuthenticateController };