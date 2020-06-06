import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../entities/User';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const passwordHashed = await hash(password, 8);

    const user = usersRepository.create({ email, password: passwordHashed });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
