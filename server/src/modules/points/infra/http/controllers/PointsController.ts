import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePointService from '@modules/points/services/CreatePointService';
import ListAllPointsByQueryService from '@modules/points/services/ListAllPointsByQueryService';
import ShowOnePointWithItemsService from '@modules/points/services/ShowOnePointWithItemsService';

class PointsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
      items,
    } = req.body;

    const createPoint = container.resolve(CreatePointService);

    const point = await createPoint.execute({
      user_id: req.user.id,
      items,
      name,
      image: req.file.filename,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    });

    return res.json(classToClass(point));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { city, uf, items } = req.query;

    const listAllPointsByQuery = container.resolve(ListAllPointsByQueryService);

    const points = await listAllPointsByQuery.execute({
      city: String(city),
      uf: String(uf),
      items: String(items),
    });

    return res.json(classToClass(points));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOnePointWithItems = container.resolve(
      ShowOnePointWithItemsService,
    );

    const point = await showOnePointWithItems.execute({ point_id: id });

    return res.json(classToClass(point));
  }
}

export default PointsController;
