import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import pointModel from '../model/Point';
interface ICollectionPointRequest {
  email: string;
  password: string;
}

class CollectionPointAuthenticateService {
  async execute({ email, password }: ICollectionPointRequest) {
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
  };
};

export { CollectionPointAuthenticateService };