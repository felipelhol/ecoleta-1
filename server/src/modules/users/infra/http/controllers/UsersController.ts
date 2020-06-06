import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ email, password });

    return res.json(classToClass(user));
  }
}

export default UsersController;
