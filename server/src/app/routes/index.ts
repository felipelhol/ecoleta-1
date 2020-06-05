import { Router } from 'express';

import usersRouter from './users.routes';
import pointsRouter from './points.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);

export default routes;
