import cache from '@config/cache';
import mailConfig from '@config/mail';
import { container } from 'tsyringe';
import BullProvider from './implementations/BullProvider';
import IQueueProvider from './models/IQueueProvider';

const providers = {
  bullProvider: BullProvider,
};
const redisConfig = cache.config.redis;
const Queue = providers.bullProvider;

container.registerInstance<IQueueProvider>(
  'QueueProvider',
  new Queue({
    ...mailConfig.queue,
    redis: redisConfig,
  }),
);
