import { MessageFromWorkerData } from '../@types/MessageFromWorkerData';

export const sendToPort = (
  port: MessagePort,
  message: MessageFromWorkerData
) => {
  port.postMessage(message);
};

export const sendToPorts = (
  portList: Set<MessagePort>,
  message: MessageFromWorkerData
) => {
  for (const port of portList) {
    port.postMessage(message);
  }
};

export const sendToPortsExceptCurrent = (
  portList: Set<MessagePort>,
  currentPort: MessagePort,
  message: MessageFromWorkerData
) => {
  for (const port of portList) {
    if (currentPort == null || port !== currentPort) port.postMessage(message);
  }
};
