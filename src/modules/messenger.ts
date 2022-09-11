import { BgMessages, BgMessageType, ContentMessages, ContentMessageType, ErrorPayload } from '../types/Messages';
import { MessengerError } from './errors';

/** Sends a message to a specific tab */
export function messageTab<MT extends ContentMessageType>(
  tabId: number,
  type: MT,
  payload: ContentMessages[MT]['payload']
) {
  return new Promise<ContentMessages[MT]['response']>((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { type, payload }, (response: ContentMessages[MT]['response'] | ErrorPayload) => {
      if (response && 'error' in response) reject(new MessengerError(response.error));
      else resolve(response);
    });
  });
}

/** Sends a message to the background script */
export function messageBg<MT extends BgMessageType>(
  type: MT,
  payload: BgMessages[MT]['payload']
) {
  return new Promise<BgMessages[MT]['response']>((resolve, reject) => {
    chrome.runtime.sendMessage({ type, payload }, (response: BgMessages[MT]['response'] | ErrorPayload) => {
      if (response && 'error' in response) reject(new MessengerError(response.error));
      else resolve(response);
    });
  });
}