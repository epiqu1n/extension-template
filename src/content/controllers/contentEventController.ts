import { ContentMessageHandler } from '../../types/Handlers';
import { ErrorPayload } from '../../types/Messages';
import processContentMessage from './contentMessageController';

/// Handlers

/** Handles messages intended for the content scripts */
export const handleContentMessage: ContentMessageHandler = ({ type, payload }, sender, sendResponse) => {
  // console.log('Content script received a message:', { type, payload });

  // Always send a response using then-chaining! async-await can't be used here :(
  processContentMessage(type, payload, sender)
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