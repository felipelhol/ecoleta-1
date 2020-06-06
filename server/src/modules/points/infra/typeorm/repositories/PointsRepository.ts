import { getRepository, Repository } from 'typeorm';

import Point from '@modules/points/infra/typeorm/entities/Point';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IFindByQueryDTO from '@modules/points/dtos/IFindByCityUfItemsDTO';

export default class PointsRepository implements IPointsRepository {
  private ormRepository: Repository<Point>;

  constructor() {
    this.ormRepository = getRepository(Point);
  }

  public async create(data: ICreatePointDTO): Promise<Point> {
    const {
      user,
      items,
      name,
      image,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    } = data;

    const point = this.ormRepository.create({
      user,
      point_items: items,
      name,
      image,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    });

    await this.ormRepository.save(point);

    return point;
  }

  public async findById(id: string): Promise<Point | undefined> {
    const point = await this.ormRepository.findOne(id, {
      relations: ['point_items'],
    });

    return point;
  }

  public async findByEmail(email: string): Promise<Point | undefined> {
    const point = await this.ormRepository.findOne({ where: { email } });

    return point;
  }

  public async findByWhatsapp(whatsapp: string): Promise<Point | undefined> {
    const point = await this.ormRepository.findOne({ where: { whatsapp } });

    return point;
  }

  public async findByCityUfItems(data: IFindByQueryDTO): Promise<Point[]> {
    const { city, uf, items } = data;

    const points = await this.ormRepository
      .createQueryBuilder('points')
      .innerJoinAndSelect('points.point_items', 'point_items')
      .where('uf ILIKE :uf', { uf })
      .andWhere('city ILIKE :city', { city })
      .andWhere('point_items.item_id IN (:...itemsIds)', { itemsIds: items })
      .distinct()
      .getMany();

    return points;
  }
}
