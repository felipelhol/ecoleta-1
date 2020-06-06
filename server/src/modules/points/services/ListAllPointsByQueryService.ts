import { injectable, inject } from 'tsyringe';

import Point from '@modules/points/infra/typeorm/entities/Point';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';

interface IRequest {
  city: string;
  uf: string;
  items: string;
}

@injectable()
class ListAllPointsByQueryService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ city, uf, items }: IRequest): Promise<Point[]> {
    const parsedItems = items.split(',').map(item => String(item.trim()));

    const points = await this.pointsRepository.findByCityUfItems({
      city,
      uf,
      items: parsedItems,
    });

    return points;
  }
}

export default ListAllPointsByQueryService;
