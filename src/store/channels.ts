// Simulate storage for Channel entity
interface Channel {
  id: string;
  name: string;
}

let channels: Channel[] = [
  {
    id: 'music',
    name: 'Music',
  },
  {
    id: 'movie',
    name: 'Movie',
  },
  {
    id: 'sports',
    name: 'Sports',
  }
];

// Get list of predefined channels
const getChannels = (): Channel[] => {
  return channels;
};

export default {
  getChannels
};
