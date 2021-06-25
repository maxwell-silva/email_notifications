interface Job {
  data: object;
}

export default interface IQueueProvider {
  add(data: object): Promise<void>;
  process(processFunction: (job: Job) => Promise<void>): void;
}
