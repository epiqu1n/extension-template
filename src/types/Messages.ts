export type Payload = Record<string, unknown>;
export type ErrorPayload = { error: string };
export type MessageResponse = Payload | ErrorPayload;

interface MessageData {
  payload: Payload | undefined,
  response: MessageResponse | void
}

export type MessageOrigin = 'background' | 'popup' | 'content';

/// Messages for content scripts

/** Types for messages intended for content scripts */
export enum ContentMessageType {
  ERROR = 'ERROR',
  PING = 'PING'
}

/** Payload and response data for messages intended for content scripts */
export interface ContentMessages extends Record<ContentMessageType, MessageData> {
  [ContentMessageType.ERROR]: {
    payload: { msg: string },
    response: void
  },
  [ContentMessageType.PING]: {
    payload: { timeDeparted: number },
    response: { deltaTime: number, timeReceived: number }
  }
}
// const test: ContentMessageData[ContentMessageType.ERROR]['payload'][''];

/** General structure of a message intended for content scripts */
export interface ContentMessage {
  type: ContentMessageType,
  payload: ContentMessages[keyof ContentMessages]['payload']
}


/// Messages for background scripts

/** Types for messages intended for background scripts */
export enum BgMessageType {
  ERROR = 'ERROR',
  PING = 'PING'
}

/** Payload and response data for messages intended for background scripts */
export interface BgMessages extends Record<BgMessageType, MessageData> {
  [BgMessageType.ERROR]: {
    payload: { msg: string },
    response: void
  },
  [BgMessageType.PING]: {
    payload: { timeDeparted: number },
    response: { deltaTime: number, timeReceived: number }
  }
}

/** General structure of a message intended for background scripts */
export interface BgMessage {
  type: BgMessageType,
  payload: BgMessages[keyof BgMessages]['payload']
}