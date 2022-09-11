import { BgMessageHandler, TabUpdatedHandler } from '../../types/Handlers';
import { ErrorPayload } from '../../types/Messages';
import processBgMessage from './bgMessageController';

/// Handlers

/** Handles messages intended for the background script */
export const handleBgMessage: BgMessageHandler = ({ type, payload }, sender, sendResponse) => {
  // console.log('Background received a message:', { type, payload });

  // Always send a response using then-chaining! async-await can't be used here :(
  processBgMessage(type, payload, sender)
  .then(sendResponse)
  .catch((err) => {
    console.error(`An uncaught error occured processing message of type ${type}`, err);
    const errMsg = err instanceof Error ? err.toString() : err;
    const errResponse: ErrorPayload = {
      error: errMsg
    };
    sendResponse(errResponse);
  });

  // Allows sending an asynchronous response
  return true;
};

/** Handles tab updates */
export const handleTabUpdate: TabUpdatedHandler = (tabId, changeInfo, tab) => {
  // DEBUG: <put tab update logic here>
};
