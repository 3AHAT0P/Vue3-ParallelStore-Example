import { inject, Ref, customRef } from 'vue';
import { ParallelStoreGlobal } from './@types/ParallelStoreGlobal';

import { parallelStoreInjectionToken } from './injectionToken';

const buildRef = <T>(
  parallelStore: ParallelStoreGlobal,
  storeName: string,
  key: string,
  initialValue: T
): Ref<T> => {
  let refTrigger: () => void;
  let value: T = initialValue;
  const ref: Ref<T> = customRef((track, trigger) => {
    refTrigger = trigger;
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        parallelStore.worker.postMessage({ op: 'SET', storeName, key, value });
        trigger();
      },
    };
  });
  (ref as any).sync = (newValue: T) => {
    value = newValue;
    refTrigger();
  };
  parallelStore.worker.postMessage({ op: 'GET', storeName, key, value });

  return ref;
};

const buildStore = (
  parallelStore: ParallelStoreGlobal,
  storeName: string,
  buildState: () => Record<string, any>,
  actions: Record<string, () => void>
) => {
  const state = buildState();
  const store: Record<string, any> = {};
  // for (const [key, value] of Object.entries(state)) {
  //   store.
  // }
  // for (const [key, value] of Object.entries(actions)) {
  // }
  const proxy: Record<string, Ref | ((...args: any[]) => void)> = new Proxy(
    store,
    {
      get(target, key: string, reciever): any {
        if (key === '__sync__')
          return (propName: string, value: any) => store[propName].sync(value);
        if (!(key in state) && !(key in actions)) return null;
        if (key in store) {
          if (key in state) return store[key].value;
          if (key in actions) return store[key];
        }
        if (key in state) {
          store[key] = buildRef(parallelStore, storeName, key, state[key]);
          return store[key].value;
        }
        if (key in actions) {
          parallelStore.worker.postMessage({
            op: 'CREATE_ACTION',
            storeName,
            key,
            source: actions[key].toString(),
          });
          store[key] = (...args: any[]) => {
            parallelStore.worker.postMessage({
              op: 'RUN_ACTION',
              storeName,
              key,
              args,
            });
          };
          return store[key];
        }
      },
      set(target, key: string, value, reciever): boolean {
        if (!(key in state)) return false;
        if (!(key in store)) return false;
        store[key].value = value;
        return true;
      },
      has(target, key: string): boolean {
        return key in state || key in store || key in actions;
      },
    }
  );

  return proxy;
};

export const defineStore = (
  name: string,
  buildState: () => Record<string, any>,
  actions: Record<string, (...args: any[]) => void>
) => {
  const useStore = () => {
    const parallelStore = inject(parallelStoreInjectionToken);

    if (parallelStore == null)
      throw new Error('Parallel store is not initiated');

    let store;
    if (name in parallelStore.stores) store = parallelStore.stores[name];
    else {
      store = buildStore(parallelStore, name, buildState, actions);
      parallelStore.stores[name] = store;
    }

    return store;
  };

  return useStore;
};
