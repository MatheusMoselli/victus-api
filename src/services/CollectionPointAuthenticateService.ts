import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { CollectionPointRepository } from '../repositories/CollectionPointRepository';
import { UserRepository } from '../repositories/UserRepository';

interface ICollectionPointRequest {
  email: string;
  password: string;
}

class CollectionPointAuthenticateService {
  async execute({ email, password }: ICollectionPointRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const collectionPointRepository = getCustomRepository(CollectionPointRepository);
    const user = await userRepository.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/Password incorrect!");
    };

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const collectionPoint = await collectionPointRepository.findOne({
      user_id: user.id
    });

    const token = sign({
      email: user.email
    }, process.env.JWT_SECRET_POINT, {
      subject: collectionPoint.id,
      expiresIn: "1d"
    })

    return token;
  };
};

export { CollectionPointAuthenticateService };