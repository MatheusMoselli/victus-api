import { getCustomRepository } from "typeorm";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { classToPlain } from "class-transformer";

class GetCompanyService {
  async execute(id: string) {
    const companyRepository = getCustomRepository(CompanyRepository);

    const company = await companyRepository.find({
      where: { id },
      relations: ["user"]
    });

    return classToPlain(company);
  }
}

export { GetCompanyService };