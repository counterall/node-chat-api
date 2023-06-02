// Simulate storage for Channel entity
import { Channel } from './types'
import { InitialState } from './types';

// Get list of predefined channels
const getChannels = (state: InitialState): Channel[] => {
  return state.channels;
};

export default {
  getChannels
};
