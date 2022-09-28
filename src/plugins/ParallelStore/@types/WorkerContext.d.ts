export interface WorkerContext {
  data: Record<string, any>;
  stores: Record<
    string,
    {
      data: Record<string, any>;
      actions: Record<string, any>;
    }
  >;
  actions: Record<string, any>;
  portList: Set<MessagePort>;
}
