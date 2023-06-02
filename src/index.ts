import express, { Request, Response } from 'express';
import config from './config'
import { Channels, Messages } from './store'
import { channelType, Message } from './store/types'
import { validateChannelId } from './helper';

const { host, port } = config;
const app = express();
app.use(express.json());

app.get('/channels', (req: Request, res: Response) => {
  res.json({ hits: Channels.getChannels() });
});

app.get('/messages/:channelId', (req: Request, res: Response) => {
  const channelId: string = req.params.channelId;
  let response: Message[] | any
  try {
    validateChannelId(channelId)
    const channelType: channelType = channelId as channelType
    response = {
      hits: Messages.getMessages(channelType)
    }
    res.json(response);
  } catch (error: any) {
    response = {
      error: error.message
    }
    res.status(400).json(response);
  }
});

app.post('/:channelId', (req: Request, res: Response) => {
  let response: any

  try {
    const channelId: string = req.params.channelId;
    validateChannelId(channelId)
    const { message }: { message: string } = req.body
    if (!(message && message.length)) {
      throw new Error(`Cannot add an empty message to ${channelId} channel.`);
    }

    const channelType: channelType = channelId as channelType
    Messages.addMessage(channelType, message)
    response = {
      success: `New message successfully added to ${channelId} channel.`
    }
    res.status(201).json(response);
  }
  catch (error: any) {
    response = {
      error: error.message
    }
    res.status(400).json(response);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "The end point you try to acccess does not exist"
  });
});

app.listen(port, () => {
  console.log(`API server is listening at ${host}:${port}`);
});
