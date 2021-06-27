import userModel from "../model/User";
import { hash } from "bcryptjs";

interface IClientRequest {
  email: string;
  password: string;
  name: string;
  CPF: string;
  birthday: Date;
  premium?: boolean;
  points?: number; 
}

class UserCreateService {
  async execute({email, password, name, CPF, birthday, premium, points}: IClientRequest) {

    const userEmailExists = await userModel.findOne({ email });
    if (userEmailExists) {
      throw new Error("Email already been used!");
    }

    const userCPFExists = await userModel.findOne({ CPF });
    if (userCPFExists) {
      throw new Error("CPF already been used!")
    }


    const passwordHash = await hash(password, 10);
    const user = userModel({
      email, 
      password: passwordHash,
      name,
      CPF, 
      birthday,
      premium,
      points
    });

    user.save();
    return user;
  };
};

export { UserCreateService };