import { MessengerError } from '../../modules/errors';
import { BgMessages, BgMessageType as BGMT, MessageOrigin} from '../../types/Messages';

/** Functions meant to handle messages of a specific type sent to the background script */
interface BgMessageHandler<T extends BGMT> {
  (
    payload: BgMessages[T]['payload'],
    origin: MessageOrigin,
    sender: chrome.runtime.MessageSender
  )
  : BgMessages[T]['response'] | Promise<BgMessages[T]['response']>
}

/** Functions meant to handle messages of specific types sent to the background script */
type BgMessageController = {
  [Key in BGMT]: BgMessageHandler<Key>;
}

/** Functions meant to handle messages of specific types sent to the background script */
const bgMessageController: BgMessageController = {
  [BGMT.ERROR]: async ({ msg }) => {
    console.error('Received an error from content scripts:', msg);
  },
  [BGMT.PING]: ({ timeDeparted }, origin) => {
    const timeReceived = Date.now();
    const deltaTime = timeReceived - timeDeparted;
    console.log(`Ping from ${origin} script took ${deltaTime} ms`);
    return { timeReceived, deltaTime };
  }
};

async function processBgMessage<MT extends BGMT>(
  type: MT,
  payload: BgMessages[MT]['payload'],
  sender: chrome.runtime.MessageSender
) {
  const origin: MessageOrigin = ('tab' in sender ? 'content' : 'popup');
  if (type in bgMessageController) return await bgMessageController[type](payload, origin, sender);
  else throw new MessengerError(`Unknown message type: ${type}`, 400);
}

export default processBgMessage;