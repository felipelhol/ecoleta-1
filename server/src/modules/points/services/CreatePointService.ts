import { injectable, inject } from 'tsyringe';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Point from '@modules/points/infra/typeorm/entities/Point';
import AppError from '@shared/errors/AppError';

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

@injectable()
class CreatePointService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

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
    const [findPointByEmail, findPointByWhatsApp] = await Promise.all([
      this.pointsRepository.findByEmail(email),
      this.pointsRepository.findByWhatsapp(whatsapp),
    ]);

    if (findPointByEmail || findPointByWhatsApp) {
      throw new AppError('Point already exists');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.point_id) {
      throw new AppError('User already has a point');
    }

    const pointItems = items
      .split(',')
      .map((item: string) => item.trim())
      .map((item: string) => ({ item_id: item }));

    const point = await this.pointsRepository.create({
      user,
      items: pointItems,
      city,
      email,
      image,
      latitude,
      longitude,
      name,
      uf,
      whatsapp,
    });

    delete point.user;

    return point;
  }
}

export default CreatePointService;
