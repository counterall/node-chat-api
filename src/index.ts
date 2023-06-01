import express, { Request, Response } from 'express';
import config from './config'

const { host, port } = config;
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    'test': "works"
  });
});

app.listen(port, () => {
  console.log(`API server is listening at ${host}:${port}`);
});
