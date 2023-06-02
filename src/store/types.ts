export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  id: number;
  text: string;
}

export interface Messages {
  music: Message[],
  movie: Message[],
  sports: Message[]
}

export type channelType = 'music' | 'movie' | 'sports'