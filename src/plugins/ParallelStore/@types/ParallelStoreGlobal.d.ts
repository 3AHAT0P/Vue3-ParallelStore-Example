export interface ParallelStoreGlobal {
  cache: Record<string, any>;
  stores: Record<string, Record<string, Ref | ((...args: any[]) => void)>>;
  worker: MessagePort | Worker;
}
