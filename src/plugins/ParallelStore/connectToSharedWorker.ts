import StoreSharedWorker from './worker/entrypoint.worker.js?sharedworker';

import { MessageFromWorkerData } from './@types/MessageFromWorkerData';
import { ParallelStoreGlobal } from './@types/ParallelStoreGlobal';

const buildOnWorkerMessage = ({ stores }: ParallelStoreGlobal) => {
  return (message: MessageEvent<MessageFromWorkerData>) => {
    const { op, storeName, key, value } = message.data;
    // if (__DEV__) console.log('MESSAGE IN UI THREAD', message.data);
    console.log('MESSAGE IN UI THREAD', message.data, stores);
    if (!(storeName in stores)) {
      console.log('Do nothing!?');
      return;
    }
    if (op === 'SET') {
      if (key in stores[storeName]) {
        if (stores[storeName][key].sync != null) {
          stores[storeName][key].sync(value);
        } else stores[storeName].__sync__(key, value);
      } else {
        console.log('Do nothing!?');
      }
    }
  };
};

export const initWorker = (options: ParallelStoreGlobal): MessagePort => {
  const worker = new StoreSharedWorker();

  worker.port.onmessage = buildOnWorkerMessage(options);

  worker.port.start();

  return worker.port;
};
