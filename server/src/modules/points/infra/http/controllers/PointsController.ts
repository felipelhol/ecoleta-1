import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreatePointService from '../services/CreatePointService';
import ListAllPointsByQueryService from '../services/ListAllPointsByQueryService';

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

    const createPoint = new CreatePointService();

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

    const listAllPointsByQuery = new ListAllPointsByQueryService();

    const point = await listAllPointsByQuery.execute({
      city: String(city),
      uf: String(uf),
      items: String(items),
    });

    return res.json({ point });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.json({ error: 'not finished' });
  }
}

export default PointsController;
