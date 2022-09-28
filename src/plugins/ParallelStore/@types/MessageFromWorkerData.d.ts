export type MessageFromWorkerData = {
  op: 'SET';
  storeName: string;
  key: string;
  value: any;
};
