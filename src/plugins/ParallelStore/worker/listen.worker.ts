import { MessageToWorkerData } from '../@types/MessageToWorkerData';
import { WorkerContext } from '../@types/WorkerContext';

import { ref } from './ref.worker';
import { sendToPort } from './send.worker';

export const listen = (
  workerContext: SharedWorkerGlobalScope,
  context: WorkerContext
) => {
  workerContext.onconnect = ({ ports }) => {
    const [port] = ports;

    context.portList.add(port);

    port.addEventListener(
      'message',
      (event: MessageEvent<MessageToWorkerData>) => {
        const { op, storeName = 'DEFAULT', key } = event.data;

        if (!(storeName in context.stores)) {
          context.stores[storeName] = { data: {}, actions: {} };
        }

        const currentStore = context.stores[storeName];

        if (op === 'GET') {
          const { value } = event.data;

          if (!(key in currentStore.data)) {
            currentStore.data[key] = ref(key, storeName, value, context);
          }

          sendToPort(port, {
            op: 'SET',
            storeName,
            key,
            value: currentStore.data[key].value,
          });
        } else if (op === 'SET') {
          const { value } = event.data;

          if (!(key in currentStore.data)) {
            currentStore.data[key] = ref(key, storeName, value, context);
          } else {
            currentStore.data[key].sync(value, port);
          }
        } else if (op === 'RUN_ACTION') {
          const { args } = event.data;

          if (key in currentStore.actions) {
            currentStore.actions[key](currentStore.data, ...args);
          }
        } else if (op === 'CREATE_ACTION') {
          if (!(key in currentStore.actions)) {
            const { source } = event.data;

            if (source.startsWith('function')) {
              currentStore.actions[key] = Function(
                `"use strict";return(${source})`
              )();
            } else {
              currentStore.actions[key] = Function(
                `"use strict";return( function ${source})`
              )();
            }
          }
        }
      }
    );

    port.start();
  };
};
