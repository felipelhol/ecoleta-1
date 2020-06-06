import Item from '@modules/items/infra/typeorm/entities/Item';

export default interface IItemsRepository {
  findAll(): Promise<Item[]>;
}
