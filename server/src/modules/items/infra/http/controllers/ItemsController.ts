import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListAllItemsService from '@modules/items/services/ListAllItemsService';

class ItemsController {
  async index(req: Request, res: Response): Promise<Response> {
    const listAllItemsService = container.resolve(ListAllItemsService);

    const items = await listAllItemsService.execute();

    return res.json(classToClass(items));
  }
}

export default ItemsController;
