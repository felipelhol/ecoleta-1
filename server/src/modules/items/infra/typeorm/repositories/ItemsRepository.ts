import { Repository, getRepository } from 'typeorm';
import Item from '@modules/items/infra/typeorm/entities/Item';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';

export default class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async findAll(): Promise<Item[]> {
    const items = await this.ormRepository.find();

    return items;
  }
}
