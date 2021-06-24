import { Request, Response } from "express";
import { CreateCompanyService } from "../services/CreateCompanyService";

class CreateCompanyController {
  async handle(req: Request, res: Response) {
    const {
      CNPJ,
      name,
      email,
      password,
    } = req.body;

    const createCompanyService = new CreateCompanyService();

    const company = await createCompanyService.execute({
      CNPJ,
      name,
      email,
      password
    });

    return res.json(company);
  };
}

export { CreateCompanyController };