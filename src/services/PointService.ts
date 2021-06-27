import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pointModel from "../model/Point";

interface ICollectionCreateRequest {
  name: string;
  email: string;
  password: string;
  CNPJ: string;
  address: {};
}

class PointService {
  async create({ name, email, password, CNPJ, address }: ICollectionCreateRequest) {
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

  async authenticate(email: string, password: string) {
    const point = await pointModel.findOne({ email });

    if(!point) {
      throw new Error("Email/Password incorrect!");
    };

    const passwordMatch = await compare(password, point.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign({
      email: point.email
    }, process.env.JWT_SECRET_POINT, {
      subject: point.id,
      expiresIn: "1d"
    })

    return token;
  }

  async get(id: string) {
    const point = pointModel.findById(id);
    if (!point) {
      throw new Error("Collection Point not found!");
    }

    return point;
  }
};

export default new PointService();