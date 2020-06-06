import { getRepository } from 'typeorm';

import Point from '../entities/Point';
import AppError from '../errors/AppError';
import User from '../entities/User';

interface IRequest {
  user_id: string;
  name: string;
  image: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
  items: string;
}

class CreatePointService {
  public async execute({
    user_id,
    name,
    image,
    email,
    whatsapp,
    city,
    uf,
    latitude,
    longitude,
    items,
  }: IRequest): Promise<Point> {
    const pointsReposity = getRepository(Point);
    const usersRepository = getRepository(User);

    const [findPointByEmail, findPointByWhatsApp] = await Promise.all([
      pointsReposity.findOne({ where: { email } }),
      pointsReposity.findOne({ where: { whatsapp } }),
    ]);

    if (findPointByEmail || findPointByWhatsApp) {
      throw new AppError('Point already exists');
    }

    const user = await usersRepository.findOne(user_id);

    if (user?.point_id) {
      throw new AppError('User already has a point');
    }

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item: number) => ({ item_id: item }));

    const point = pointsReposity.create({
      name,
      image,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
      point_items: pointItems,
      user,
    });

    await pointsReposity.save(point);

    delete point.user;

    return point;
  }
}

export default CreatePointService;
