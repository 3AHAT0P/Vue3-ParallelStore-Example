import type { Plugin } from 'vue';
import { ParallelStoreGlobal } from './@types/ParallelStoreGlobal';

import { initWorker } from './connectToSharedWorker';

import { parallelStoreInjectionToken } from './injectionToken';

export * from './hooks';
export * from './defineStore';

export const parallelStore: Plugin = {
  install(app, options) {
    const storeConfig: ParallelStoreGlobal = {
      cache: {},
      stores: {
        DEFAULT: {},
      },
      worker: null!,
    };

    app.config.globalProperties.$parallelStore = storeConfig;

    app.provide(parallelStoreInjectionToken, storeConfig);

    storeConfig.worker = initWorker(storeConfig);
  },
};
