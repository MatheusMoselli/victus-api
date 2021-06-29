import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import pointModel from "../model/Point";
import pointTransactionModel from "../model/PointsTransaction";
import userModel from "../model/User";
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
    const point = new pointModel({
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
    const point = await pointModel.findById(id);
    if (!point) {
      throw new Error("Collection Point not found!");
    }

    return point;
  }

  async transaction( pounds:number, user_cpf: string, id: string) {
    const user = await userModel.findOne({ CPF: user_cpf })
    .catch(err => {
      throw new Error(`User with CPF ${user_cpf} not found`);
    });
    const point = await pointModel.findById(id)
    .catch(err => {
      throw new Error(`Collection Point not found`);
    })

    const points = this.convertPoundsToPoints(pounds);
    point.received_pounds += pounds;
    point.given_points += points;
    user.points += points;

    const transaction = new pointTransactionModel({
      points,
      user_receiver: user.id,
      point_sender: id
    });

    await userModel.findOneAndUpdate({ CPF: user.CPF }, { points: user.points }, { new: true });
    await pointModel.findByIdAndUpdate(id, { 
      received_pounds: point.received_pounds,
      given_points: point.given_points
    }, { new: true });
    
    transaction.save()
    .catch(err => { throw new Error("An error has occurred, please try again later") });

    return transaction;
  }

  async update(id: string, name: string, address: {}, profile_picture: string) {
    const update = { name, address, profile_picture };

    const point = await pointModel.findByIdAndUpdate(id, update, { new: true })
    .catch(err => {
      throw new Error(err.message);
    });

    return point;
  }

  convertPoundsToPoints(pounds: number) {
    return pounds * 500;
  }
};

export default new PointService();