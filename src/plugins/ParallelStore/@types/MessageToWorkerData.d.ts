export type MessageToWorkerData =
  | {
      op: 'SET' | 'GET';
      storeName: string;
      key: string;
      value: any;
    }
  | {
      op: 'RUN_ACTION';
      storeName: string;
      key: string;
      args: any[];
    }
  | {
      op: 'CREATE_ACTION';
      storeName: string;
      key: string;
      source: string;
    };
