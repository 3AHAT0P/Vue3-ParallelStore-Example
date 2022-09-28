import { WorkerContext } from '../@types/WorkerContext.js';

import { sendToPorts, sendToPortsExceptCurrent } from './send.worker.js';

export const ref = (
  key: string,
  storeName: string,
  initialValue: any,
  context: WorkerContext
) => {
  let _value = initialValue;
  return {
    _key: key,
    get value() {
      return _value;
    },
    set value(newValue) {
      _value = newValue;
      console.log('!!!!!!!!!!', key, _value, context.portList);
      sendToPorts(context.portList, {
        op: 'SET',
        storeName,
        key,
        value: _value,
      });
    },
    sync(newValue: any, currentPort: MessagePort) {
      _value = newValue;
      sendToPortsExceptCurrent(context.portList, currentPort, {
        op: 'SET',
        storeName,
        key,
        value: _value,
      });
    },
  };
};
