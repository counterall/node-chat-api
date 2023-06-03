import express, { Express, Request, Response } from 'express';
import config from './config'
import { Channels, Messages } from './store'
import { channelType, Message } from './store/types'
import { validateChannelId } from './helper';
import { initialState as appState } from './store/state'
import cors from 'cors'

const { host, port, frontendHost } = config;
const app: Express = express();
app.use(express.json());

// Allow frontend app access to this API server
app.use(cors({
  origin: frontendHost
}));

// The endpoint to show entire in-memory storage
app.get('/db', (req: Request, res: Response) => {
  res.json({ state: appState });
});

// The endpoint to fetch list of channels
app.get('/channels', (req: Request, res: Response) => {
  res.json({ hits: Channels.getChannels(appState) });
});

// The endpoint to fetch message of a given channel
app.get('/messages/:channelId', (req: Request, res: Response) => {
  const channelId: string = req.params.channelId;
  let response: Message[] | any
  try {
    validateChannelId(appState, channelId)
    const channelType: channelType = channelId as channelType
    response = {
      hits: Messages.getMessages(appState, channelType)
    }
    res.json(response);
  } catch (error: any) {
    response = {
      error: error.message
    }
    res.status(400).json(response);
  }
});

// The endpoint to post a new message to in-memory storage
app.post('/:channelId', (req: Request, res: Response) => {
  let response: any

  try {
    const channelId: string = req.params.channelId;
    validateChannelId(appState, channelId)
    const { message }: { message: string } = req.body
    if (!(message && message.length)) {
      throw new Error(`Cannot add an empty message to ${channelId} channel.`);
    }

    const channelType: channelType = channelId as channelType
    Messages.addMessage(appState, channelType, message)
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

// Show a response with 404 for all endpoints which are not defined
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "The end point you try to acccess does not exist"
  });
});

app.listen(port, () => {
  console.log(`API server is listening at ${host}:${port}`);
});
