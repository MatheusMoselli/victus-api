import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import companyModel from "../model/Company";

interface ICompanyRequest {
  email: string;
  password: string;
}

class CompanyAuthenticateService {
  async execute({email, password}: ICompanyRequest) {
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
  };
};

export { CompanyAuthenticateService };