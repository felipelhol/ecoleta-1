import Point from '@modules/points/infra/typeorm/entities/Point';
import ICreatePointDTO from '@modules/points/dtos/ICreatePointDTO';
import IFindByCityUfItemsDTO from '@modules/points/dtos/IFindByCityUfItemsDTO';

export default interface IPointsRepository {
  create(data: ICreatePointDTO): Promise<Point>;
  findById(id: string): Promise<Point | undefined>;
  findByEmail(email: string): Promise<Point | undefined>;
  findByWhatsapp(whatsapp: string): Promise<Point | undefined>;
  findByCityUfItems(data: IFindByCityUfItemsDTO): Promise<Point[]>;
}
