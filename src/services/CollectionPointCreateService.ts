import pointModel from "../model/Point";
import { hash } from "bcryptjs";

interface ICollectionRequest {
  name: string;
  email: string;
  password: string;
  CNPJ: string;
  address: {};
}

class CollectionPointCreateService {
  async execute({ name, email, password, CNPJ, address }: ICollectionRequest) {
    const emailExists = await pointModel.findOne({ email });

    if (emailExists) {
      throw new Error("Email already been used!");
    }

    const CNPJExists = await pointModel.findOne({ CNPJ });

    if (CNPJExists) {
      throw new Error("CNPJ already been used!");
    }

    const passwordHash = await hash(password, 8);
    const point = pointModel({
      name,
      email,
      password: passwordHash,
      CNPJ,
      address
    });

    point.save();
    return point;
  }
}

export { CollectionPointCreateService };