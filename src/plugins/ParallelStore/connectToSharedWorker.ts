import StoreSharedWorker from './worker/entrypoint.worker.js?sharedworker';

import { MessageFromWorkerData } from './@types/MessageFromWorkerData';
import { ParallelStoreGlobal } from './@types/ParallelStoreGlobal';

const buildOnWorkerMessage = ({ stores }: ParallelStoreGlobal) => {
  return (message: MessageEvent<MessageFromWorkerData>) => {
    const { op, storeName, key, value } = message.data;

    if (!(storeName in stores)) {
      console.log('What should I do? Maybe nothing!?'); // @TODO:
      return;
    }

    if (op === 'SET') {
      if (key in stores[storeName]) {
        if (stores[storeName][key].sync != null) {
          stores[storeName][key].sync(value);
        } else stores[storeName].__sync__(key, value);
      } else {
        console.log('What should I do? Maybe nothing!?'); // @TODO:
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
