import companyModel from '../model/Company';
import { hash } from "bcryptjs"; 

interface ICompanyRequest {
  CNPJ: string;
  name: string;
  email: string;
  password: string;
}

class CompanyCreateService {
  async execute({ CNPJ, name, email, password }: ICompanyRequest) {
    const emailExists = await companyModel.findOne({ email });
    if (emailExists) {
      throw new Error("Email already been used!");
    }

    const CNPJExists = await companyModel.findOne({ CNPJ });
    if (CNPJExists) {
      throw new Error("CNPJ already been used!")
    }

    const passwordHash = await hash(password, 10);
    const company = companyModel({
      email, 
      password: passwordHash,
      name,
      CNPJ
    });

    company.save();
    return company;
  }
}

export { CompanyCreateService };