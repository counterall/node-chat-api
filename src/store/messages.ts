// Simulate storage for message entity
import { Message, Messages, channelType } from './types'

let messages: Messages = {
  music: [],
  movie: [],
  sports: []
}

// Get list of predefined channels
const getMessages = (channelId: channelType): Message[] => {
  if (typeof messages[channelId] === 'undefined') {
    messages[channelId] = []
  }
  return messages[channelId];
};

// Add a new message for a specific channel
const addMessage = (channelId: channelType, message: string) => {
  if (!message) {
    throw new Error(`Cannot add an empty message to channel ${channelId}`);
  }
  const oldMessages: Message[] = messages[channelId] ? [...messages[channelId]] : []
  const newMessageId = oldMessages.length + 1
  messages[channelId] =  [...oldMessages, {
    id: newMessageId,
    text: message
  }]
};

export default {
  getMessages,
  addMessage
};
