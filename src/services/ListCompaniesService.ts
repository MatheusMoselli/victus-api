import { getCustomRepository } from "typeorm";
import { CompanyRepository } from "../repositories/CompanyRepository";

class ListCompaniesService {
  async execute() {
    const companyRepository = getCustomRepository(CompanyRepository);
    const companies = await companyRepository.find({ relations: ["user"] });

    return companies;
  }
};

export { ListCompaniesService };