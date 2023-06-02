// Simulate storage for Channel entity
import { Channel } from './types'
import config from '../config'

let channels: Channel[] = [
  ...config.channels
];

// Get list of predefined channels
const getChannels = (): Channel[] => {
  return channels;
};

export default {
  getChannels
};
