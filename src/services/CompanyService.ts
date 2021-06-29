import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import companyModel from '../model/Company';
import eventModel from '../model/Event';

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
      throw new Error("Email already been used!");
    }

    const CNPJExists = await companyModel.findOne({ CNPJ });
    if (CNPJExists) {
      throw new Error("CNPJ already been used!")
    }

    const passwordHash = await hash(password, 10);
    const company = new companyModel({
      email, 
      password: passwordHash,
      name,
      CNPJ
    });

    company.save();
    return company;
  }

  async authenticate(email: string, password: string) {
    const company = await companyModel.findOne({
      email
    });

    if(!company) {
      throw new Error("Email/Password incorrect!");
    };
    
    const passwordMatch = await compare(password, company.password);
    
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const token = sign({
      email: company.email
    }, process.env.JWT_SECRET_COMPANY, {
      subject: company.id,
      expiresIn: "1d"
    });

    return token;
  }

  async get(id: string) {
    const company = companyModel.findById(id);
    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }

  async createEvent({ name, address, date, necessary_points, creator, type}: ICreateEventRequest) {
    const id = creator;
    const company = await companyModel.findById(id)
    .catch(err => {
      throw new Error("Company not found");
    });

    company.many_events += 1;
    
    const event = new eventModel({
      name,
      address,
      date,
      necessary_points,
      creator,
      type

    });

    await companyModel.findByIdAndUpdate(id, { many_events: company.many_events }, { new: true });    

    event.save();
    return event;
  }

  async myEvents(id: string) {
    const events = await eventModel.find({ creator: id })
    .catch(err => {
      throw new Error("Internal server error");
    });

    if (!events.length) {
      throw new Error("you don't have created any event yet");
    };

    return events;
  } 

  async update({ id, name}: ICompanyUpdateRequest) {
    const update = { name};

    const company = await companyModel.findByIdAndUpdate(id, update, { new: true })
    .catch(err => {
      throw new Error(err.message);
    });

    return company;
  }
  
  async delete(id:string){
    
    await companyModel.findByIdAndDelete(id)
    .catch(err => {
      throw new Error("Wasn't possible to delete this company, please try again later");
    })
  }
};

export default new CompanyService();