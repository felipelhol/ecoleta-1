import { Router } from 'express';

import ItemsController from '@modules/items/infra/http/controllers/ItemsController';

const itemsRouter = Router();
const itemsController = new ItemsController();

itemsRouter.get('/', itemsController.index);

export default itemsRouter;
