import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import companyModel from "../model/Company";
import eventModel from "../model/Event";

interface ICreateCompanyRequest {
  CNPJ: string;
  name: string;
  email: string;
  password: string;
}

interface ICreateEventRequest {
  name: string;
  address: {};
  necessary_points: number;
  details: string;
  date: Date;
  creator: string;
  type: string;
}

interface ICompanyUpdateRequest {
  id: string;
  name: string;
}

class CompanyService {
  async create({ CNPJ, name, email, password }: ICreateCompanyRequest) {
    const emailExists = await companyModel.findOne({ email });
    if (emailExists) {
      throw new Error("Este email já está sendo utilizado!");
    }

    const CNPJExists = await companyModel.findOne({ CNPJ });
    if (CNPJExists) {
      throw new Error("Este CNPJ já está sendo utilizado!");
    }

    const passwordHash = await hash(password, 10);
    const company = new companyModel({
      email,
      password: passwordHash,
      name,
      CNPJ,
    });

    company.save();
    return company;
  }

  async authenticate(email: string, password: string) {
    const company = await companyModel.findOne({
      email,
    });

    if (!company) {
      throw new Error("Email/Senha incorretos!");
    }

    const passwordMatch = await compare(password, company.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorretos!");
    }

    const token = sign(
      {
        email: company.email,
      },
      process.env.JWT_SECRET_COMPANY,
      {
        subject: company.id,
        expiresIn: "1d",
      }
    );

    return token;
  }

  async get(id: string) {
    const company = companyModel.findById(id);
    if (!company) {
      throw new Error("Empresa não encontrada");
    }

    return company;
  }

  async createEvent({
    name,
    address,
    date,
    necessary_points,
    details,
    creator,
    type,
  }: ICreateEventRequest) {
    const id = creator;
    const company = await companyModel.findById(id).catch((err) => {
      throw new Error("Empresa não encontrada");
    });

    company.many_events += 1;

    const event = new eventModel({
      name,
      address,
      date,
      necessary_points,
      details,
      creator,
      type,
    });

    await companyModel.findByIdAndUpdate(
      id,
      { many_events: company.many_events },
      { new: true }
    );

    event.save();
    return event;
  }

  async myEvents(id: string) {
    const events = await eventModel.find({ creator: id }).catch((err) => {
      throw new Error("Algo deu errado! Tente novamente mais tarde!");
    });

    if (!events.length) {
      throw new Error("Você ainda não criou nenhum evento!");
    }

    return events;
  }

  async update({ id, name }: ICompanyUpdateRequest) {
    const update = { name };

    const company = await companyModel
      .findByIdAndUpdate(id, update, { new: true })
      .catch((err) => {
        throw new Error(err.message);
      });

    return company;
  }

  async delete(id: string) {
    await companyModel.findByIdAndDelete(id).catch((err) => {
      throw new Error(
        "Não foi possível deletar essa empresa, por favor tente novamente mais tarde"
      );
    });
  }
}

export default new CompanyService();
