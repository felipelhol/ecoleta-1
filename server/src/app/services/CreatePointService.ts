import { getRepository } from 'typeorm';

import Point from '../entities/Point';
import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
}

class CreatePointService {
  public async execute({
    name,
    image,
    email,
    whatsapp,
    city,
    uf,
    latitude,
    longitude,
  }: IRequest): Promise<Point> {
    const pointsReposity = getRepository(Point);

    const [findPointByEmail, findPointByWhatsApp] = await Promise.all([
      pointsReposity.findOne({ where: { email } }),
      pointsReposity.findOne({ where: { whatsapp } }),
    ]);

    if (findPointByEmail || findPointByWhatsApp) {
      throw new AppError('Point already exists');
    }

    const point = pointsReposity.create({
      name,
      image,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    });

    await pointsReposity.save(point);

    return point;
  }
}

export default CreatePointService;
