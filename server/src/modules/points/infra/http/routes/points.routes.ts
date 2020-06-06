import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/handleAppError';
import multerConfig from '@config/multer';

import PointsController from '@modules/points/infra/http/controllers/PointsController';

import createPointValidator from '@modules/points/infra/http/validators/createPointValidator';
import indexPointValidator from '@modules/points/infra/http/validators/indexPointValidator';

const pointsRouter = Router();
const pointsController = new PointsController();
const upload = multer(multerConfig);

pointsRouter.use(ensureAuthenticated);

pointsRouter.post(
  '/',
  upload.single('image'),
  createPointValidator,
  pointsController.create,
);

pointsRouter.get('/', indexPointValidator, pointsController.index);
// pointsRouter.get('/points/:id', pointsController.show);

// pointsRouter.post(
//   '/points',
//   upload.single('image'),
//
//   }, { abortEarly: false }),
//   pointsController.create
// );

export default pointsRouter;
