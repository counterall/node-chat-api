// Simulate storage for message entity
import { Message, channelType } from './types'
import { InitialState } from './types';

// Get list of predefined channels
const getMessages = (state: InitialState, channelId: channelType): Message[] => {
  return state.messages.filter(m => m.channelId === channelId);
};

// Add a new message for a specific channel
const addMessage = (state: InitialState, channelId: channelType, message: string) => {
  if (!message) {
    throw new Error(`Cannot add an empty message to channel ${channelId}`);
  }
  state.messages = [...state.messages, {
    channelId,
    text: message
  }]
};

export default {
  getMessages,
  addMessage
};
