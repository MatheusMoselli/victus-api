import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import userModel from "../model/User";

interface IUserCreateRequest {
  email: string;
  password: string;
  name: string;
  CPF: string;
  birthday: Date;
  premium?: boolean;
  points?: number;
}

interface IUserUpdateRequest {
  id: string;
  name: string;
  birthday: Date;
};
class UserService {
  async create({ email, password, name, CPF, birthday, premium, points}: IUserCreateRequest) {
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
  }

  async get(id: string) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    };

    return user;
  }

  async authenticate(email: string, password: string) {
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
  }

  async update({ id, name, birthday }: IUserUpdateRequest) {
    const filter = { _id: id };
    const update = { name, birthday };

    const user = await userModel.findOneAndUpdate(filter, update ,{ new: true })
    .catch(err => {
      throw new Error(err.message);
    });

    return user;
  }
};

export default new UserService();