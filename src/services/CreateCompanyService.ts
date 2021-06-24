import { getCustomRepository } from "typeorm";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { CreateUserService } from "./CreateUserService";

interface ICompanyRequest {
  CNPJ: string;
  name: string;
  email: string;
  password: string;
}

class CreateCompanyService {
  async execute({ CNPJ, name, email, password }: ICompanyRequest) {
    const companyRepository = getCustomRepository(CompanyRepository);
    const userService = new CreateUserService();

    const companyExists = await companyRepository.findOne({
      CNPJ
    });
    
    if (companyExists) {
      throw new Error("CNPJ already been used!");
    };
    
    const user = await userService.execute({
      name,
      email,
      password
    });
    

    const company = companyRepository.create({
      CNPJ,
      user_id: user.id,
    })

    await companyRepository.save(company);

    return company;
  }
}

export { CreateCompanyService };