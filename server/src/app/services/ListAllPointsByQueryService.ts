import { getRepository } from 'typeorm';

import Point from '../entities/Point';

interface IRequest {
  city: string;
  uf: string;
  items: string;
}

class ListAllPointsByQueryService {
  public async execute({ city, uf, items }: IRequest): Promise<Point[]> {
    const pointsRepository = getRepository(Point);

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await pointsRepository.find({
      where: { city, uf },
    });
  }
}

export default ListAllPointsByQueryService;
