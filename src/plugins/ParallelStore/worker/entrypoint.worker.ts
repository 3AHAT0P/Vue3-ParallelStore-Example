import { listen } from './listen.worker';

// import {
//   count,
//   incrementAction,
//   incrementLaterAction,
// } from '../modules/counter.js';

// const cache = {
//   [count._key]: count,
// };

// const registeredRefs = {
//   [count._key]: count,
// };

// const registeredActions = {
//   incrementAction,
//   incrementLaterAction,
// };

const _globalThis: SharedWorkerGlobalScope = globalThis as any;

listen(_globalThis, {
  data: {},
  actions: {},
  stores: {
    DEFAULT: {
      data: {},
      actions: {},
    },
  },
  portList: new Set(),
});
