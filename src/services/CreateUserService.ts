import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({name, email, password}: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if(!email){
      throw new Error("Invalid Email");
    };

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new Error("Email already been used!");
    }

    const passwordEncrypted = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordEncrypted
    });

    await userRepository.save(user);
    return user;
  }
}

export { CreateUserService };