import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ISubscribersRepository from '@modules/subscribers/repositories/ISubscriberRepository';
import SubscribersRepository from '@modules/subscribers/infra/typeorm/repositories/SubscribersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ISubscribersRepository>(
  'SubscribersRepository',
  SubscribersRepository,
);
