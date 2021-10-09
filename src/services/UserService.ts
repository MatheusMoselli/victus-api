import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import eventModel from "../model/Event";
import ticketModel from "../model/EventTicket";
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
}
class UserService {
  async create({
    email,
    password,
    name,
    CPF,
    birthday,
    premium,
    points,
  }: IUserCreateRequest) {
    const userEmailExists = await userModel.findOne({ email });
    if (userEmailExists) {
      throw new Error("Este Email já está sendo utilizado!");
    }

    const userCPFExists = await userModel.findOne({ CPF });
    if (userCPFExists) {
      throw new Error("Este CPF já está sendo utilizado!");
    }

    const passwordHash = await hash(password, 10);
    const user = new userModel({
      email,
      password: passwordHash,
      name,
      CPF,
      birthday,
      premium,
      points,
    });

    user.save();
    return user;
  }

  async get(id: string) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async authenticate(email: string, password: string) {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Senha incorretos!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorretos!");
    }

    const token = sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET_USER,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }

  async update({ id, name, birthday }: IUserUpdateRequest) {
    const update = { name, birthday };

    const user = await userModel
      .findByIdAndUpdate(id, update, { new: true })
      .catch((err) => {
        throw new Error(err.message);
      });

    return user;
  }

  async delete(id: string) {
    await userModel.findByIdAndDelete(id).catch((err) => {
      throw new Error(
        "Não foi possível deletar esse usuário, por favor tente novamente mais tarde"
      );
    });
  }

  async buyTicket(event_id: string, user_id: string) {
    const event = await eventModel.findById(event_id);
    const user = await userModel.findById(user_id);
    const ticketExists = await ticketModel.findOne({
      event_receiver: event_id,
      user_sender: user_id,
    });
    if (ticketExists) {
      throw new Error("Você já possui um ingresso para esse evento");
    }

    if (user.points < event.necessary_points) {
      throw new Error(
        "Você não tem os pontos necessários para entrar no evento"
      );
    }

    user.points -= event.necessary_points;
    const ticket = new ticketModel({
      user_sender: user_id,
      event_receiver: event_id,
    });

    ticket.save();
    await userModel.findByIdAndUpdate(user.id, { points: user.points });

    return ticket;
  }

  async myEvents(id: string) {
    const tickets = await ticketModel
      .find({ user_sender: id })
      .populate("event_receiver")
      .catch((err) => {
        throw new Error("Algo deu errado! Tente novamente mais tarde!");
      });

    if (!tickets.length) {
      throw new Error("Você não possui nenhum ingresso ainda!");
    }

    return tickets;
  }
}

export default new UserService();
