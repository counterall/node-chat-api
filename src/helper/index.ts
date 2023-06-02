import config from '../config'
const { channels } = config;
const channelIds: string[] = channels.map(c => c.id)

export const validateChannelId = (channelId: string) => {
  if (!channelId) {
    throw new Error(`You have given an empty channel ID`);
  }
  if (!channelIds.includes(channelId)) {
    throw new Error(`The ${channelId} channel you tried to access does not exist.`);
  }
}