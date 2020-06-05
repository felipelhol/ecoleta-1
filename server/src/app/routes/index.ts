import { Router } from 'express';

import usersRouter from './users.routes';
import pointsRouter from './points.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);

export default routes;
