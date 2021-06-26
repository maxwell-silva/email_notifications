import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';

import '../../container';
import '../typeorm';

import ProcessQueueService from '@modules/subscribers/services/ProcessQueueService';

const processQueue = container.resolve(ProcessQueueService);

processQueue.execute();

console.log('⚗‎‎  Processing mail sending queue!');
