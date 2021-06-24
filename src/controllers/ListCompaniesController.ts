import { Request, Response } from "express";
import { ListCompaniesService } from "../services/ListCompaniesService";

class ListCompaniesController {
  async handle(req: Request, res: Response) {
    const listCompaniesService = new ListCompaniesService();
    const companies = await listCompaniesService.execute();

    return res.json(companies);
  }
};

export { ListCompaniesController };