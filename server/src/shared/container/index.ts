import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import PointsRepository from '@modules/points/infra/typeorm/repositories/PointsRepository';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/typeorm/repositories/ItemsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  PointsRepository,
);

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  ItemsRepository,
);
