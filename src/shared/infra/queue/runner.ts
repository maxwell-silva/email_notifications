import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';

import '@shared/infra/typeorm';
import '@shared/container';

import ProcessQueueService from '@modules/subscribers/services/ProcessQueueService';

const processQueue = container.resolve(ProcessQueueService);

processQueue.execute();

console.log('⚗‎‎  Processing mail sending queue!');
