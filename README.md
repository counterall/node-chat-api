# A simple Express.js API server for AlphaSense's test

## How to start
1. Basic url is http://localhost:3334
2. Execute '`npm run serve`' to launch the API server
3. .nvmrc indicates the node version used when developing this project.

## File structure

1. src/index.ts is the file to setup server with defined API endpoints
2. src/store folder includes all files to manipulate in-memory storage
   - src/store/state.ts defines the initial global storage with a list of channel entities
   - src/store/channels.ts and src/store/messages.ts define actions to read or update the global storage
3. src/helper folder aims to provide general helper functions
4. src/config.ts defines global configuration object, e.g. the port of the API server


## API endpoints

1. GET /db: it returns the entire global storage
2. GET /channels: it returns the list of channel entities
3. GET /messages/:channelId: it returns the list of message entities for a given channel identified by :channelId
4. POST /:channelId: it posts a new message entity to the global storage for a given channel identified by :channelId
4. Besides all endpoints mentioned above, any request to the API server will get a json response with 404 code and error message