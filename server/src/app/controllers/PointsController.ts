import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreatePointService from '../services/CreatePointService';

class PointsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, whatsapp, city, uf, latitude, longitude } = req.body;

    const createPoint = new CreatePointService();

    const point = await createPoint.execute({
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

  async index(req: Request, res: Response): Promise<Response> {
    return res.json({ error: 'not finished' });
  }

  async show(req: Request, res: Response): Promise<Response> {
    return res.json({ error: 'not finished' });
  }
}

export default PointsController;
