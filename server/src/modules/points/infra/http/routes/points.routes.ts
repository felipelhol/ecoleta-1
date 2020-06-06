import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';

import PointsController from '@modules/points/infra/http/controllers/PointsController';

import createPointValidator from '@modules/points/infra/http/validators/createPointValidator';
import indexPointValidator from '@modules/points/infra/http/validators/indexPointValidator';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import IDParamsMustBeUUID from '@shared/infra/http/validators/IDParamsMustBeUUID';

const pointsRouter = Router();
const pointsController = new PointsController();
const upload = multer(multerConfig);

pointsRouter.use('/:id', IDParamsMustBeUUID);

pointsRouter.get('/', indexPointValidator, pointsController.index);
pointsRouter.get('/:id', pointsController.show);

pointsRouter.use(ensureAuthenticated);

pointsRouter.post(
  '/',
  upload.single('image'),
  createPointValidator,
  pointsController.create,
);

export default pointsRouter;
