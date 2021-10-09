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
  async create({
    name,
    email,
    password,
    CNPJ,
    address,
  }: ICollectionCreateRequest) {
    const emailExists = await pointModel.findOne({ email });

    if (emailExists) {
      throw new Error("Email já está sendo utilizado!");
    }

    const CNPJExists = await pointModel.findOne({ CNPJ });

    if (CNPJExists) {
      throw new Error("CNPJ já está sendo utilizado!");
    }

    const passwordHash = await hash(password, 8);
    const point = new pointModel({
      name,
      email,
      password: passwordHash,
      CNPJ,
      address,
    });

    point.save();
    return point;
  }

  async authenticate(email: string, password: string) {
    const point = await pointModel.findOne({ email });

    if (!point) {
      throw new Error("Email/Password incorretos!");
    }

    const passwordMatch = await compare(password, point.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorretos!");
    }

    const token = sign(
      {
        email: point.email,
      },
      process.env.JWT_SECRET_POINT,
      {
        subject: point.id,
        expiresIn: "1d",
      }
    );

    return token;
  }

  async get(id: string) {
    const point = await pointModel.findById(id);
    if (!point) {
      throw new Error("Ponto de coleta não encontrado");
    }

    return point;
  }

  async transaction(pounds: number, user_cpf: string, id: string) {
    const user = await userModel.findOne({ CPF: user_cpf }).catch((err) => {
      throw new Error(`Usuário com CPF ${user_cpf} não encontrado`);
    });
    const point = await pointModel.findById(id).catch((err) => {
      throw new Error(`Ponto de coleta não encontrado`);
    });

    const points = this.convertPoundsToPoints(pounds);
    point.received_pounds += pounds;
    point.given_points += points;
    user.points += points;

    const transaction = new pointTransactionModel({
      points,
      user_receiver: user.id,
      point_sender: id,
    });

    await userModel.findOneAndUpdate(
      { CPF: user.CPF },
      { points: user.points },
      { new: true }
    );
    await pointModel.findByIdAndUpdate(
      id,
      {
        received_pounds: point.received_pounds,
        given_points: point.given_points,
      },
      { new: true }
    );

    transaction.save().catch((err) => {
      throw new Error("Algo deu errado! Tente novamente mais tarde!");
    });

    return transaction;
  }

  async update(id: string, name: string, address: {}, profile_picture: string) {
    const update = { name, address, profile_picture };

    const point = await pointModel
      .findByIdAndUpdate(id, update, { new: true })
      .catch((err) => {
        throw new Error(err.message);
      });

    return point;
  }

  async recent(id: string) {
    const top_recent = await pointTransactionModel
      .find({ point_sender: id })
      .limit(3)
      .populate("user_receiver");
    if (!top_recent.length) {
      throw new Error("Você não possui nenhuma transação ainda");
    }

    return top_recent;
  }

  async allTransactions(id: string) {
    const transactions = await pointTransactionModel
      .find({ point_sender: id })
      .populate("user_receiver");

    if (!transactions.length) {
      throw new Error("Você não possui nenhuma transação ainda");
    }

    return transactions;
  }

  convertPoundsToPoints(pounds: number) {
    return pounds * 500;
  }
}

export default new PointService();
