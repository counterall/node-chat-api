import express, { Request, Response } from 'express';
import config from './config'
import { Channels, Messages } from './store'
import { channelType, Message } from './store/types'

const { host, port, channels } = config;
const channelIds: string[] = channels.map(c => c.id)
const app = express();
app.use(express.json());

app.get('/channels', (req: Request, res: Response) => {
  res.json({ hits: Channels.getChannels() });
});

app.get('/messages/:channelId', (req: Request, res: Response) => {
  const channelId: string = req.params.channelId;
  let response: Message[] | any
  try {
    if (channelIds.includes(channelId)) {
      const channelType: channelType = channelId as channelType
      response = {
        hits: Messages.getMessages(channelType)
      }
    } else {
      response = {
        'error': `Invalid Channel Type ${channelId} detected`
      }
    }
  } catch (error) {
    response = {
      error: `Failed to fetch messages for channel ${channelId}: ${error}`
    }
  }
  
  res.json(response);
});

app.post('/:channelId', (req: Request, res: Response) => {
  let response: any

  try {
    const channelId: string = req.params.channelId;
    if (!channelId) {
      throw new Error(`You have given an empty channel ID`);
    }
    if (!channelIds.includes(channelId)) {
      throw new Error(`The ${channelId} channel you tried to add new message to does not exist.`);
    }
    const { message }: { message: string } = req.body
    if (!(message && message.length)) {
      throw new Error(`Cannot add an empty message to ${channelId} channel.`);
    }

    const channelType: channelType = channelId as channelType
    Messages.addMessage(channelType, message)
    response = {
      success: `New message successfully added to ${channelId} channel.`
    }
  }
  catch (error: any) {
    response = {
      error: error.message
    }
  }
  res.json(response);
});

app.listen(port, () => {
  console.log(`API server is listening at ${host}:${port}`);
});
