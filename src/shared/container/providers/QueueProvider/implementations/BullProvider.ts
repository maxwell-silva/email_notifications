import Bull, { Queue, QueueOptions, ProcessPromiseFunction } from 'bull';

import IQueueProvider from '../models/IQueueProvider';

class BullProvider implements IQueueProvider {
  private queue: Queue;

  constructor(queueConfig: QueueOptions) {
    this.queue = new Bull('mail-queue', queueConfig);
  }

  async add(data: object | object[]): Promise<void> {
    if (Array.isArray(data)) {
      const parsedJobs = data.map(jobData => {
        return { data: jobData };
      });

      await this.queue.addBulk(parsedJobs);

      return;
    }

    await this.queue.add(data);
  }

  process(processFunction: ProcessPromiseFunction<object>): void {
    const time = 1000 * 60 * 5;
    this.queue.process(time, processFunction);
  }
}

export default BullProvider;
