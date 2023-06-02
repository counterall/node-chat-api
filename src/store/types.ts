export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  channelId: string;
  text: string;
}

export interface InitialState {
  channels: Channel[],
  messages: Message[]
}

export type channelType = 'music' | 'movie' | 'sports'