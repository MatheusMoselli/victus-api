import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { CompanyRepository } from "../repositories/CompanyRepository";

interface ICompanyRequest {
  email: string;
  password: string;
}

class CompanyAuthenticateService {
  async execute({email, password}: ICompanyRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const companyRepository = getCustomRepository(CompanyRepository);
    const user = await userRepository.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect!");
    };
    
    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const company = await companyRepository.findOne({
      user_id: user.id
    });

    const token = sign({
      email: user.email
    }, process.env.JWT_SECRET_COMPANY, {
      subject: company.id,
      expiresIn: "1d"
    });

    return token;
  };
};

export { CompanyAuthenticateService };