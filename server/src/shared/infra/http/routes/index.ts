import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import pointsRouter from '@modules/points/infra/http/routes/points.routes';
import itemsRouter from '@modules/items/infra/http/routes/items.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/items', itemsRouter);

export default routes;
