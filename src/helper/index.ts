import { InitialState } from "../store/types";
export const validateChannelId = (state:InitialState, channelId: string) => {
  if (!channelId) {
    throw new Error(`You have given an empty channel ID`);
  }
  const channelIds: string[] = state.channels.map(c => c.id)

  if (!channelIds.includes(channelId)) {
    throw new Error(`The ${channelId} channel you tried to access does not exist.`);
  }
}