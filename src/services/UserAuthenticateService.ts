import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import userModel from "../model/User";

interface IUserRequest {
  email: string;
  password: string;
}

class UserAuthenticateService {
  async execute({ email, password }: IUserRequest) {
    const user = await userModel.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect!");
    };

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign({
      email: user.email
    }, process.env.JWT_SECRET_USER, {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;
  };
};

export { UserAuthenticateService };