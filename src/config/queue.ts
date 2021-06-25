import { QueueOptions } from 'bull';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface QueueConfig {
  driver: 'bull';

  config: {
    bull: QueueOptions;
  };
}

export default {
  driver: 'bull',

  config: {
    bull: {},
  },
} as QueueConfig;
