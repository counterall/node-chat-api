import express, { Request, Response } from 'express';
import config from './config'
import { Channels } from './store'

const { host, port } = config;
const app = express();
app.use(express.json());

app.get('/channels', (req: Request, res: Response) => {
  res.json({ hits: Channels.getChannels() });
});

app.listen(port, () => {
  console.log(`API server is listening at ${host}:${port}`);
});
