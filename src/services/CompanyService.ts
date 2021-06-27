import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import companyModel from '../model/Company';

interface ICompanyCreateRequest {
  CNPJ: string;
  name: string;
  email: string;
  password: string;
}


class CompanyService {
  async create({ CNPJ, name, email, password }: ICompanyCreateRequest) {
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

  async authenticate(email: string, password: string) {
    const company = await companyModel.findOne({
      email
    });

    if(!company) {
      throw new Error("Email/Password incorrect!");
    };
    
    const passwordMatch = await compare(password, company.password);
    
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign({
      email: company.email
    }, process.env.JWT_SECRET_COMPANY, {
      subject: company.id,
      expiresIn: "1d"
    });

    return token;
  }

  async get(id: string) {
    const company = companyModel.findById(id);
    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }
};

export default new CompanyService();