import { inject, Ref, customRef } from 'vue';
import { parallelStoreInjectionToken } from '../injectionToken';

export const useWorkerRef = <T>(key: string, initialValue: T): Ref<T> => {
  const parallelStore = inject(parallelStoreInjectionToken);

  if (parallelStore == null) throw new Error('Parallel store is not initiated');

  if (key in parallelStore.stores['DEFAULT']) {
    return parallelStore.stores['DEFAULT'][key];
  }

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
        parallelStore.worker.postMessage({
          op: 'SET',
          storeName: 'DEFAULT',
          key,
          value,
        });
        trigger();
      },
    };
  });
  (ref as any).sync = (newValue: T) => {
    value = newValue;
    refTrigger();
  };

  parallelStore.stores['DEFAULT'][key] = ref;
  parallelStore.worker.postMessage({
    op: 'GET',
    storeName: 'DEFAULT',
    key,
    value,
  });

  return ref;
};
