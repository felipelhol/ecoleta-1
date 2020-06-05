import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({
      user: classToClass(user),
      token,
    });
  }
}

export default SessionController;
