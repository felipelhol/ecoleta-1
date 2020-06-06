import { injectable, inject } from 'tsyringe';

import Point from '@modules/points/infra/typeorm/entities/Point';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  point_id: string;
}

@injectable()
class ShowOnePointWithItemsService {
  constructor(
    @inject('PointsRepository')
    private pointsRepository: IPointsRepository,
  ) {}

  public async execute({ point_id }: IRequest): Promise<Point> {
    const point = await this.pointsRepository.findById(point_id);

    if (!point) {
      throw new AppError('Point does not exists.');
    }

    return point;
  }
}

export default ShowOnePointWithItemsService;
