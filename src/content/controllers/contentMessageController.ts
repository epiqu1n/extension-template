import { MessengerError } from '../../modules/errors';
import { ContentMessages, ContentMessageType as CMT } from '../../types/Messages';

/** Functions meant to handle messages of a specific type sent to content scripts */
interface ContentMessageHandler<T extends CMT> {
  (
    payload: ContentMessages[T]['payload']
  )
  : ContentMessages[T]['response'] | Promise<ContentMessages[T]['response']>
}

/** Functions meant to handle messages of specific types sent to content scripts */
type ContentMessageController = {
  [Key in CMT]: ContentMessageHandler<Key>;
}

/** Functions meant to handle messages of specific types sent to content scripts */
const contentMessageController: ContentMessageController = {
  [CMT.ERROR]: async ({ msg }) => {
    console.error('Received an error from content scripts:', msg);
  },
  [CMT.PING]: ({ timeDeparted }) => {
    const timeReceived = Date.now();
    const deltaTime = timeReceived - timeDeparted;
    console.log(`Ping from content scripts took ${deltaTime} ms`);
    return { timeReceived, deltaTime };
  }
};

async function processContentMessage<MT extends CMT>(
  type: MT,
  payload: ContentMessages[MT]['payload'],
  sender: chrome.runtime.MessageSender
) {
  if (type in contentMessageController) return await contentMessageController[type](payload);
  else throw new MessengerError(`Unknown message type: ${type}`, 400);
}

export default processContentMessage;