import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';
import createSessionValidator from '@modules/users/infra/http/validators/createSessionValidator';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', createSessionValidator, sessionController.create);

export default sessionRouter;
