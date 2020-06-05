import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';

import PointsController from '../controllers/PointsController';
import createPointValidator from '../validators/createPointValidator';

const pointsRouter = Router();
const pointsController = new PointsController();
const upload = multer(multerConfig);

pointsRouter.post(
  '/',
  upload.single('image'),
  createPointValidator,
  pointsController.create,
);

// pointsRouter.get('/points', pointsController.index);
// pointsRouter.get('/points/:id', pointsController.show);

// pointsRouter.post(
//   '/points',
//   upload.single('image'),
//
//   }, { abortEarly: false }),
//   pointsController.create
// );

export default pointsRouter;
